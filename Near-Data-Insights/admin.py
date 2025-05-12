import streamlit as st
import pandas as pd
import plotly.express as px
from utils import load_and_clean_data, get_driver_data, get_customer_data, get_stats
import plotly.graph_objects as go
from datetime import datetime

# Page configuration
st.set_page_config(
    page_title="Logistics Optimization - Admin Dashboard",
    page_icon="⚙️",
    layout="wide",
    initial_sidebar_state="expanded"
)

# Page header with logo and title
st.title("⚙️ Survey Data Admin Dashboard")

# Get data and statistics
df = load_and_clean_data()
stats = get_stats(df)
driver_data = get_driver_data(df)
customer_data = get_customer_data(df)

# Display data statistics with nicer formatting
st.markdown("### 📊 Survey Data Statistics")
col1, col2, col3, col4, col5 = st.columns(5)

with col1:
    st.metric(
        label="Total Records",
        value=stats["total_responses"]
    )
    
with col2:
    st.metric(
        label="Drivers",
        value=stats["driver_count"]
    )
    
with col3:
    st.metric(
        label="Customers",
        value=stats["customer_count"]
    )
    
with col4:
    st.metric(
        label="Willing Drivers",
        value=stats["willing_drivers"]
    )
    
with col5:
    st.metric(
        label="Willing Customers",
        value=stats["willing_customers"]
    )

# Raw data view with tabs for different views
tab1, tab2, tab3 = st.tabs(["All Data", "Driver Data", "Customer Data"])

with tab1:
    st.markdown("### 📋 Complete Survey Data")
    st.dataframe(df, use_container_width=True, hide_index=True)
    
    # Add download option
    if not df.empty:
        csv = df.to_csv(index=False).encode('utf-8')
        st.download_button(
            label="Download CSV",
            data=csv,
            file_name=f"survey_data_{datetime.now().strftime('%Y%m%d')}.csv",
            mime="text/csv"
        )

with tab2:
    st.markdown("### 🚚 Driver Data")
    st.dataframe(driver_data, use_container_width=True, hide_index=True)
    
    # Distribution of driver responses over time
    if not driver_data.empty and 'timestamp' in driver_data.columns:
        st.markdown("### 📅 Driver Responses Over Time")
        driver_data['month_year'] = pd.to_datetime(driver_data['timestamp']).dt.strftime('%Y-%m')
        timeline_data = driver_data['month_year'].value_counts().reset_index()
        timeline_data.columns = ['Month', 'Count']
        timeline_data = timeline_data.sort_values('Month')
        
        fig = px.line(
            timeline_data, 
            x='Month', 
            y='Count',
            markers=True,
            title='Driver Responses by Month',
            labels={'Count': 'Number of Responses', 'Month': 'Month-Year'},
            color_discrete_sequence=['#1E88E5']
        )
        fig.update_layout(
            plot_bgcolor='white',
            hovermode='x unified'
        )
        st.plotly_chart(fig, use_container_width=True)

with tab3:
    st.markdown("### 👤 Customer Data")
    st.dataframe(customer_data, use_container_width=True, hide_index=True)
    
    # Distribution of customer responses over time
    if not customer_data.empty and 'timestamp' in customer_data.columns:
        st.markdown("### 📅 Customer Responses Over Time")
        customer_data['month_year'] = pd.to_datetime(customer_data['timestamp']).dt.strftime('%Y-%m')
        timeline_data = customer_data['month_year'].value_counts().reset_index()
        timeline_data.columns = ['Month', 'Count']
        timeline_data = timeline_data.sort_values('Month')
        
        fig = px.line(
            timeline_data, 
            x='Month', 
            y='Count',
            markers=True,
            title='Customer Responses by Month',
            labels={'Count': 'Number of Responses', 'Month': 'Month-Year'},
            color_discrete_sequence=['#4CAF50']
        )
        fig.update_layout(
            plot_bgcolor='white',
            hovermode='x unified'
        )
        st.plotly_chart(fig, use_container_width=True)

# Add data operations section
st.markdown("---")
st.markdown("### 🔄 Data Operations")

if st.button("Refresh Data"):
    st.rerun()

# Display data information
st.markdown("### 📁 Data Source Information")
st.info("Data is loaded from the CSV file in attached_assets/Encuesta_NEAR_limpia.csv")