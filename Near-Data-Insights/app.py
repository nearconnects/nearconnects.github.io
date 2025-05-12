import streamlit as st
import pandas as pd
import plotly.express as px
import plotly.graph_objects as go
import altair as alt
import numpy as np
from utils import load_and_clean_data, get_driver_data, get_customer_data, get_stats
from assets.logos import transport_logistics_svg, delivery_svg, route_optimization_svg

# Page configuration
st.set_page_config(page_title="Logistics Optimization Survey Insights",
                   page_icon="🚚",
                   layout="wide",
                   initial_sidebar_state="expanded")

# Custom CSS for enhanced visuals
st.markdown("""
<style>
    .main-header {
        font-size: 42px !important;
        font-weight: 600 !important;
        color: #1E3A8A !important;
        margin-bottom: 0px !important;
        padding-bottom: 0px !important;
        text-align: center;
    }
    .sub-header {
        font-size: 22px !important;
        color: #4B5563 !important;
        font-style: italic;
        margin-top: 0px !important;
        margin-bottom: 30px !important;
        text-align: center;
    }
    .metric-card {
        background-color: #F3F4F6;
        border-radius: 10px;
        padding: 20px;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    }
    .tab-subheader {
        font-size: 24px !important;
        font-weight: 600 !important;
        color: #1E3A8A !important;
        margin-top: 20px !important;
    }
    .highlight-metric {
        color: #1E40AF;
        font-weight: bold;
    }
    .stTabs [data-baseweb="tab-list"] {
        gap: 10px;
    }
    .stTabs [data-baseweb="tab"] {
        height: 50px;
        white-space: pre-wrap;
        background-color: #F9FAFB;
        border-radius: 4px 4px 0px 0px;
        gap: 1px;
        padding-top: 10px;
        padding-bottom: 10px;
    }
    .stTabs [aria-selected="true"] {
        background-color: #DBEAFE !important;
        color: #1E40AF !important;
        font-weight: bold;
    }
    /* Customize the container padding */
    .block-container {
        padding-top: 1rem;
        padding-bottom: 0rem;
    }
</style>
""",
            unsafe_allow_html=True)

# Add a sidebar title
st.sidebar.title("Survey Data Dashboard")
st.sidebar.info("This dashboard shows insights from the NEAR logistics optimization survey.")

# Load data from CSV file
df = load_and_clean_data()

# Show loading message
if not df.empty:
    stats = get_stats(df)
    st.sidebar.success(
        f"Successfully loaded {stats['total_responses']} survey responses"
    )
else:
    st.sidebar.error(
        "Failed to load data from CSV. Please check the file path and format."
    )

# Process data for visualization
driver_data = get_driver_data(df)
customer_data = get_customer_data(df)

# Header with enhanced styling
st.markdown('<h1 class="main-header">📊 Never Empty Again on Return</h1>',
            unsafe_allow_html=True)
st.markdown('<p class="sub-header">Dashboard Graphs</p>',
            unsafe_allow_html=True)

# Key metrics row with improved styling
st.markdown('<h2 class="tab-subheader">📈 Key Market Insights</h2>',
            unsafe_allow_html=True)

# Create metrics cards with custom styling
metrics_col1, metrics_col2, metrics_col3, metrics_col4 = st.columns(4)

with metrics_col1:
    st.markdown('<div class="metric-card">', unsafe_allow_html=True)
    st.metric(label="Total Respondents",
              value=len(df),
              delta=f"{len(df[df['is_driver'] == True])} Drivers",
              delta_color="normal")
    st.markdown('</div>', unsafe_allow_html=True)

with metrics_col2:
    drivers_with_empty_cargo = len(
        driver_data[driver_data['empty_cargo'] == 'Sí'])
    percentage = round(drivers_with_empty_cargo / len(driver_data) *
                       100 if len(driver_data) > 0 else 0)

    st.markdown('<div class="metric-card">', unsafe_allow_html=True)
    st.metric(label="Drivers with Empty Cargo",
              value=f"{drivers_with_empty_cargo}",
              delta=f"{percentage}%",
              delta_color="normal")
    st.markdown('</div>', unsafe_allow_html=True)

with metrics_col3:
    willing_drivers = len(
        driver_data[driver_data['willing_to_deliver'] == 'Sí'])
    percentage = round(willing_drivers / len(driver_data) *
                       100 if len(driver_data) > 0 else 0)

    st.markdown('<div class="metric-card">', unsafe_allow_html=True)
    st.metric(label="Drivers Willing to Deliver",
              value=f"{willing_drivers}",
              delta=f"{percentage}%",
              delta_color="normal")
    st.markdown('</div>', unsafe_allow_html=True)

with metrics_col4:
    very_willing_customers = len(
        customer_data[customer_data['willingness_level'] == 'Muy dispuesto']
    ) if 'willingness_level' in customer_data.columns else 0
    percentage = round(very_willing_customers / len(customer_data) *
                       100 if len(customer_data) > 0 else 0)

    st.markdown('<div class="metric-card">', unsafe_allow_html=True)
    st.metric(label="Very Willing Customers",
              value=f"{very_willing_customers}",
              delta=f"{percentage}%",
              delta_color="normal")
    st.markdown('</div>', unsafe_allow_html=True)

# Summary insight
st.info(f"""
    💡 **Key Insight**: {percentage}% of drivers are willing to deliver packages during empty trips, 
    representing a significant untapped opportunity for logistics optimization.
""")

# Layout with tabs
tab1, tab2, tab3 = st.tabs(
    ["Driver Insights", "Customer Preferences", "Business Opportunity"])

with tab1:
    st.markdown("## 🚚 Driver Analysis")

    col1, col2 = st.columns(2)

    with col1:
        # Display the transport SVG
        st.markdown(transport_logistics_svg, unsafe_allow_html=True)

        # Create a pie chart for driver employment type
        if not driver_data.empty:
            employment_counts = driver_data['employment_type'].value_counts(
            ).reset_index()
            employment_counts.columns = ['Employment Type', 'Count']

            fig = px.pie(employment_counts,
                         values='Count',
                         names='Employment Type',
                         title='Driver Employment Type',
                         color_discrete_sequence=px.colors.sequential.Blues_r)
            fig.update_traces(textposition='inside', textinfo='percent+label')
            st.plotly_chart(fig, use_container_width=True)
        else:
            st.info(
                "No driver data available to display employment statistics.")

    with col2:
        # Create a bar chart for empty cargo frequency
        if not driver_data.empty and 'empty_trips_frequency' in driver_data.columns:
            frequency_counts = driver_data[
                'empty_trips_frequency'].value_counts().reset_index()
            frequency_counts.columns = ['Frequency', 'Count']

            # Sort in logical order
            order = ['1-3', '3-5', '5-7', '7-10', '10+']
            frequency_counts['Frequency'] = pd.Categorical(
                frequency_counts['Frequency'], categories=order, ordered=True)
            frequency_counts = frequency_counts.sort_values('Frequency')

            # Using a fixed color palette instead of continuous scale
            fixed_colors = ['#0D47A1', '#1565C0', '#1976D2', '#1E88E5', '#2196F3']
            
            fig = px.bar(
                frequency_counts,
                x='Frequency',
                y='Count',
                title='Empty Return Trips per Week',
                color='Frequency',
                color_discrete_map={
                    '1-3': fixed_colors[0],
                    '3-5': fixed_colors[1],
                    '5-7': fixed_colors[2],
                    '7-10': fixed_colors[3],
                    '10+': fixed_colors[4]
                },
                text='Count'
            )
            fig.update_traces(texttemplate='%{text}', textposition='outside')
            fig.update_layout(plot_bgcolor='white')
            st.plotly_chart(fig, use_container_width=True)
        else:
            st.info(
                "No driver data available to display empty cargo frequency.")

        # Vehicle type distribution
        if not driver_data.empty and 'vehicle_type' in driver_data.columns:
            vehicle_counts = driver_data['vehicle_type'].value_counts(
            ).reset_index()
            vehicle_counts.columns = ['Vehicle Type', 'Count']

            # Define discrete colors for vehicle types
            vehicle_colors = {
                'Furgón pequeño': '#0D47A1',
                'Furgón grande': '#1565C0',
                'Camión rígido': '#1976D2',
                'Camión articulado': '#1E88E5'
            }
            
            fig = px.bar(
                vehicle_counts,
                x='Vehicle Type',
                y='Count',
                title='Vehicle Types Used by Drivers',
                color='Vehicle Type',
                color_discrete_map=vehicle_colors,
                text='Count'
            )
            fig.update_traces(texttemplate='%{text}', textposition='outside')
            fig.update_layout(
                plot_bgcolor='white',
                showlegend=False  # Hide legend as the x-axis already shows categories
            )
            st.plotly_chart(fig, use_container_width=True)
        else:
            st.info("No data available to display vehicle types.")

with tab2:
    st.markdown("## 📦 Customer Preferences")

    col1, col2 = st.columns(2)

    with col1:
        # Display the delivery SVG
        st.markdown(delivery_svg, unsafe_allow_html=True)

        # Delivery preference pie chart
        if not customer_data.empty and 'delivery_preference' in customer_data.columns:
            preference_counts = customer_data[
                'delivery_preference'].value_counts().reset_index()
            preference_counts.columns = ['Delivery Preference', 'Count']

            fig = px.pie(preference_counts,
                         values='Count',
                         names='Delivery Preference',
                         title='Customer Delivery Preferences',
                         color_discrete_sequence=px.colors.sequential.Greens_r)
            fig.update_traces(textposition='inside', textinfo='percent+label')
            st.plotly_chart(fig, use_container_width=True)
        else:
            st.info(
                "No customer data available to display delivery preferences.")

    with col2:
        # Customer willingness histogram
        if not customer_data.empty and 'willingness_level' in customer_data.columns:
            willingness_counts = customer_data[
                'willingness_level'].value_counts().reset_index()
            willingness_counts.columns = ['Willingness Level', 'Count']

            # Define order for willingness levels
            order = ['Muy dispuesto', 'Poco dispuesto', 'Nada dispuesto']
            willingness_counts['Willingness Level'] = pd.Categorical(
                willingness_counts['Willingness Level'],
                categories=order,
                ordered=True)
            willingness_counts = willingness_counts.sort_values(
                'Willingness Level')

            # Define discrete colors for willingness levels
            willingness_colors = {
                'Muy dispuesto': '#0D6E45',
                'Poco dispuesto': '#34D399',
                'Nada dispuesto': '#6EE7B7'
            }

            fig = px.bar(willingness_counts,
                         x='Willingness Level',
                         y='Count',
                         title='Customer Willingness to Use Service',
                         color='Willingness Level',
                         color_discrete_map=willingness_colors,
                         text='Count')
            fig.update_traces(texttemplate='%{text}', textposition='outside')
            fig.update_layout(
                plot_bgcolor='white',
                showlegend=False
            )
            st.plotly_chart(fig, use_container_width=True)
        else:
            st.info(
                "No customer data available to display willingness levels.")

    # Package delivery frequency
    if not customer_data.empty and 'package_frequency' in customer_data.columns:
        st.markdown("### 📊 Package Delivery Frequency")
        freq_counts = customer_data['package_frequency'].value_counts(
        ).reset_index()
        freq_counts.columns = ['Frequency', 'Count']

        # Define order for frequency
        order = ['1-5', '5-10', '10 o más']
        freq_counts['Frequency'] = pd.Categorical(freq_counts['Frequency'],
                                                  categories=order,
                                                  ordered=True)
        freq_counts = freq_counts.sort_values('Frequency')

        # Define discrete colors for frequency levels
        frequency_colors = {
            '1-5': '#0D6E45',
            '5-10': '#34D399',
            '10 o más': '#6EE7B7'
        }
        
        fig = px.bar(freq_counts,
                     x='Frequency',
                     y='Count',
                     title='Package Delivery Frequency',
                     color='Frequency',
                     color_discrete_map=frequency_colors,
                     text='Count')
        fig.update_layout(
            plot_bgcolor='white',
            showlegend=False
        )
        fig.update_traces(texttemplate='%{text}', textposition='outside')
        st.plotly_chart(fig, use_container_width=True)

with tab3:
    st.markdown(
        '<h2 class="tab-subheader">💼 Business Opportunity Analysis</h2>',
        unsafe_allow_html=True)

    # Display the route optimization SVG
    st.markdown(route_optimization_svg, unsafe_allow_html=True)

    # Add a brief introduction to the opportunity
    st.markdown("""
    <div style="background-color: #EFF6FF; padding: 20px; border-radius: 10px; margin-bottom: 20px;">
        <h3 style="color: #1E40AF; margin-top: 0;">NEAR Delivery: Connecting Supply with Demand</h3>
        <p>Our market analysis reveals a significant opportunity to optimize logistics by leveraging <b>empty cargo space</b> 
        during return trips. By connecting drivers with available space to customers needing delivery services, we create 
        a win-win situation that benefits all stakeholders while reducing environmental impact.</p>
    </div>
    """,
                unsafe_allow_html=True)

    col1, col2 = st.columns(2)

    with col1:
        # Opportunity calculation with improved visuals
        if not driver_data.empty and not customer_data.empty:
            willing_drivers_pct = willing_drivers / len(driver_data) if len(
                driver_data) > 0 else 0
            willing_customers_pct = len(customer_data[
                customer_data['willingness_level'] ==
                'Muy dispuesto']) / len(customer_data) if len(
                    customer_data
                ) > 0 and 'willingness_level' in customer_data.columns else 0

            st.markdown(
                '<div style="background-color: #F3F4F6; padding: 15px; border-radius: 10px; margin-bottom: 15px;">',
                unsafe_allow_html=True)
            st.markdown(
                '<h3 style="color: #1E3A8A; margin-top: 0;">Market Readiness</h3>',
                unsafe_allow_html=True)

            # Create gauge charts for willingness with improved colors and appearance
            fig = go.Figure(
                go.Indicator(mode="gauge+number+delta",
                             value=willing_drivers_pct * 100,
                             title={
                                 'text': "Drivers Willing to Participate",
                                 'font': {
                                     'size': 24,
                                     'color': '#1E3A8A'
                                 }
                             },
                             delta={
                                 'reference': 50,
                                 'increasing': {
                                     'color': 'green'
                                 }
                             },
                             number={
                                 'suffix': "%",
                                 'font': {
                                     'size': 28,
                                     'color': '#1E3A8A'
                                 }
                             },
                             gauge={
                                 'axis': {
                                     'range': [None, 100],
                                     'tickwidth': 1,
                                     'tickcolor': "#1E3A8A"
                                 },
                                 'bar': {
                                     'color': "#2563EB"
                                 },
                                 'bgcolor':
                                 "white",
                                 'borderwidth':
                                 2,
                                 'bordercolor':
                                 "#E5E7EB",
                                 'steps': [{
                                     'range': [0, 30],
                                     'color': '#EFF6FF'
                                 }, {
                                     'range': [30, 70],
                                     'color': '#DBEAFE'
                                 }, {
                                     'range': [70, 100],
                                     'color': '#BFDBFE'
                                 }],
                                 'threshold': {
                                     'line': {
                                         'color': "#10B981",
                                         'width': 4
                                     },
                                     'thickness': 0.75,
                                     'value': 80
                                 }
                             }))

            fig.update_layout(height=250,
                              margin=dict(l=30, r=30, t=50, b=30),
                              paper_bgcolor='rgba(0,0,0,0)',
                              plot_bgcolor='rgba(0,0,0,0)')
            st.plotly_chart(fig, use_container_width=True)

            fig2 = go.Figure(
                go.Indicator(mode="gauge+number+delta",
                             value=willing_customers_pct * 100,
                             title={
                                 'text': "Customers Willing to Use Service",
                                 'font': {
                                     'size': 24,
                                     'color': '#065F46'
                                 }
                             },
                             delta={
                                 'reference': 50,
                                 'increasing': {
                                     'color': 'green'
                                 }
                             },
                             number={
                                 'suffix': "%",
                                 'font': {
                                     'size': 28,
                                     'color': '#065F46'
                                 }
                             },
                             gauge={
                                 'axis': {
                                     'range': [None, 100],
                                     'tickwidth': 1,
                                     'tickcolor': "#065F46"
                                 },
                                 'bar': {
                                     'color': "#10B981"
                                 },
                                 'bgcolor':
                                 "white",
                                 'borderwidth':
                                 2,
                                 'bordercolor':
                                 "#E5E7EB",
                                 'steps': [{
                                     'range': [0, 30],
                                     'color': '#ECFDF5'
                                 }, {
                                     'range': [30, 70],
                                     'color': '#D1FAE5'
                                 }, {
                                     'range': [70, 100],
                                     'color': '#A7F3D0'
                                 }],
                                 'threshold': {
                                     'line': {
                                         'color': "#059669",
                                         'width': 4
                                     },
                                     'thickness': 0.75,
                                     'value': 80
                                 }
                             }))

            fig2.update_layout(height=250,
                               margin=dict(l=30, r=30, t=50, b=30),
                               paper_bgcolor='rgba(0,0,0,0)',
                               plot_bgcolor='rgba(0,0,0,0)')
            st.plotly_chart(fig2, use_container_width=True)
            st.markdown('</div>', unsafe_allow_html=True)
        else:
            st.info(
                "Insufficient data to calculate business opportunity metrics.")

    with col2:
        # Market Match Analysis with enhanced visuals
        st.markdown(
            '<div style="background-color: #F3F4F6; padding: 15px; border-radius: 10px;">',
            unsafe_allow_html=True)
        st.markdown(
            '<h3 style="color: #1E3A8A; margin-top: 0;">Market Match Analysis</h3>',
            unsafe_allow_html=True)

        if not driver_data.empty and 'empty_trips_frequency' in driver_data.columns and not customer_data.empty and 'package_frequency' in customer_data.columns:
            # Calculate potential market match
            total_empty_trips = driver_data['empty_trips_frequency'].apply(
                lambda x: 2 if x == '1-3' else 4 if x == '3-5' else 6
                if x == '5-7' else 8 if x == '7-10' else 12).sum()

            total_packages = customer_data['package_frequency'].apply(
                lambda x: 3 if x == '1-5' else 7 if x == '5-10' else 12
                if x == '10 o más' else 0).sum()

            # Create a more visually appealing chart for supply and demand
            supply_demand_data = pd.DataFrame({
                'Category':
                ['Empty Trips<br>(Supply)', 'Packages<br>(Demand)'],
                'Count': [total_empty_trips, total_packages],
                'Color': ['#3B82F6',
                          '#10B981']  # Blue for drivers, green for customers
            })

            fig = px.bar(supply_demand_data,
                         x='Category',
                         y='Count',
                         title='Weekly Supply vs Demand',
                         color='Color',
                         color_discrete_map={
                             '#3B82F6': '#3B82F6',
                             '#10B981': '#10B981'
                         },
                         text='Count',
                         labels={
                             'Count': 'Weekly Volume',
                             'Category': ''
                         })

            fig.update_traces(texttemplate='%{text}',
                              textposition='outside',
                              width=0.6)
            fig.update_layout(showlegend=False,
                              plot_bgcolor='white',
                              margin=dict(l=20, r=20, t=40, b=20),
                              yaxis=dict(gridcolor='#F3F4F6', ),
                              xaxis=dict(tickangle=0))
            st.plotly_chart(fig, use_container_width=True)

            # Market efficiency calculation with a more visual presentation
            market_efficiency = min(total_empty_trips, total_packages) / max(
                total_empty_trips, total_packages) * 100

            # Create a progress bar for the market efficiency
            efficiency_color = "#10B981" if market_efficiency > 70 else "#FBBF24" if market_efficiency > 40 else "#EF4444"

            st.markdown(f"""
            <h4 style="color: #1E3A8A; margin-bottom: 5px;">Market Efficiency Potential:</h4>
            <div style="background-color: #E5E7EB; border-radius: 10px; height: 24px; position: relative; margin-bottom: 20px;">
                <div style="background-color: {efficiency_color}; width: {min(market_efficiency, 100)}%; height: 100%; border-radius: 10px;"></div>
                <div style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; display: flex; align-items: center; justify-content: center; color: #000;">
                    <strong>{market_efficiency:.1f}%</strong>
                </div>
            </div>
            """,
                        unsafe_allow_html=True)

            st.markdown(f"""
            <p>Our survey data reveals significant potential for optimizing logistics:</p>
            <ul>
                <li><strong>Supply:</strong> {total_empty_trips} empty trips available weekly</li>
                <li><strong>Demand:</strong> {total_packages} packages needing delivery weekly</li>
                <li><strong>Match Rate:</strong> {min(total_empty_trips, total_packages)} potential matches</li>
            </ul>
            """,
                        unsafe_allow_html=True)

            st.markdown('</div>', unsafe_allow_html=True)

            # Value proposition section with visual enhancements
            st.markdown("""
            <div style="background-color: #EFF6FF; padding: 20px; border-radius: 10px; margin-top: 20px;">
                <h3 style="color: #1E40AF; margin-top: 0;">💡 Key Value Proposition</h3>
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px;">
                    <div style="background-color: white; padding: 15px; border-radius: 8px; border-left: 4px solid #3B82F6;">
                        <h4 style="color: #1E40AF; margin-top: 0;">For Drivers</h4>
                        <p>Generate <strong>additional income</strong> during otherwise unprofitable empty trips</p>
                    </div>
                    <div style="background-color: white; padding: 15px; border-radius: 8px; border-left: 4px solid #10B981;">
                        <h4 style="color: #065F46; margin-top: 0;">For Customers</h4>
                        <p>Enjoy <strong>reduced costs</strong> through shared transportation resources</p>
                    </div>
                    <div style="background-color: white; padding: 15px; border-radius: 8px; border-left: 4px solid #6366F1;">
                        <h4 style="color: #3730A3; margin-top: 0;">Environmental Impact</h4>
                        <p>Create <strong>sustainability benefits</strong> by optimizing vehicle usage and reducing emissions</p>
                    </div>
                    <div style="background-color: white; padding: 15px; border-radius: 8px; border-left: 4px solid #F59E0B;">
                        <h4 style="color: #92400E; margin-top: 0;">Logistics Efficiency</h4>
                        <p>Achieve <strong>network efficiency</strong> through intelligent route optimization</p>
                    </div>
                </div>
            </div>
            """,
                        unsafe_allow_html=True)
        else:
            st.info("Insufficient data to calculate market match analysis.")

# Feedback section with improved styling
st.markdown("""
<div style="background-color: #F9FAFB; padding: 1px 20px; border-radius: 10px; margin-top: 30px;">
    <h3 style="color: #4B5563;">📝 Customer Feedback</h3>
</div>
""",
            unsafe_allow_html=True)

with st.expander("View Survey Comments & Feedback"):
    if not customer_data.empty and 'comments' in customer_data.columns:
        comments = customer_data[customer_data['comments'].notna()][[
            'comments'
        ]]
        if not comments.empty:
            st.markdown('<div style="max-height: 300px; overflow-y: auto;">',
                        unsafe_allow_html=True)
            for idx, row in comments.iterrows():
                st.markdown(f"""
                <div style="background-color: white; padding: 10px 15px; border-radius: 8px; margin-bottom: 10px; border-left: 3px solid #3B82F6;">
                    <p><strong>Comment {idx+1}:</strong> {row['comments']}</p>
                </div>
                """,
                            unsafe_allow_html=True)
            st.markdown('</div>', unsafe_allow_html=True)
        else:
            st.info("No comments available in the survey data.")
    else:
        st.info("No comment data available.")

# Add next steps section
st.markdown("""
<div style="background-color: #EFF6FF; padding: 20px; border-radius: 10px; margin-top: 30px; margin-bottom: 30px;">
    <h3 style="color: #1E40AF; margin-top: 0;">🚀 Next Steps</h3>
    <ol style="margin-bottom: 0;">
        <li><strong>Develop MVP Application</strong> - Create a user-friendly platform connecting drivers and customers</li>
        <li><strong>Marketing Campaign</strong> - Target the identified driver and customer segments</li>
        <li><strong>Pilot Program</strong> - Launch in select cities with high logistics activity</li>
        <li><strong>Gather Feedback</strong> - Continuously optimize the service based on user experiences</li>
        <li><strong>Expand Service Area</strong> - Scale the solution to additional regions</li>
    </ol>
</div>
""",
            unsafe_allow_html=True)

# Enhanced footer
st.markdown("""
<footer style="background-color: #1E3A8A; padding: 20px; border-radius: 10px; text-align: center; margin-top: 40px;">
    <div style="display: flex; justify-content: center; align-items: center; flex-direction: column;">
        <h2 style="color: white; margin-bottom: 10px;">Never Empty Again on Return</h2>
        <p style="color: white; margin-bottom: 5px;">Connecting empty cargo space with delivery needs</p>
        <p style="color: #BFDBFE; font-size: 12px;">Created by NEAR • Data based on survey analysis</p>
    </div>
</footer>
""",
            unsafe_allow_html=True)
