import pandas as pd
import numpy as np
import streamlit as st
import os

@st.cache_data
def load_and_clean_data():
    """
    Load and clean the survey data from the CSV file
    """
    # Use the Encuesta_NEAR_limpia.csv file
    current_dir = os.path.dirname(os.path.abspath(__file__))
    csv_path = os.path.join(current_dir, "attached_assets/Encuesta_NEAR_limpia.csv")
    
    # Load the CSV file
    try:
        # Using ',' as the delimiter and fixing encoding
        df = pd.read_csv(csv_path, encoding='utf-8')
    except UnicodeDecodeError:
        # Try with different encoding if utf-8 fails
        df = pd.read_csv(csv_path, encoding='latin-1')
    except FileNotFoundError:
        st.error(f"File not found: {csv_path}")
        return pd.DataFrame()  # Return empty DataFrame if file not found
    
    # Clean column names (remove BOM if present)
    # Check if the first column name starts with the BOM character
    if isinstance(df.columns[0], str) and df.columns[0].startswith('\ufeff'):
        df.columns = [df.columns[0][1:]] + list(df.columns[1:])
    
    # Rename columns to more user-friendly names
    column_map = {
        'Marca temporal': 'timestamp',
        'Genero ': 'gender',
        '¿Qué edad tienes?': 'age',
        '¿Trabajas en la carretera? 🚚 ': 'is_driver',
        '¿Eres autónomo o asalariado?': 'employment_type',
        '¿Tienes momentos en los que la carga esta vacía?': 'empty_cargo',
        '¿Estarías dispuesto a recoger un envío adicional si este se ajusta a tu ruta actual y está disponible inmediatamente? 📍': 'willing_to_deliver',
        '¿Con qué frecuencia tienes viajes de retorno vacíos a la semana? ⌛': 'empty_trips_frequency',
        '¿Qué tipo de vehículo usas?': 'vehicle_type',
        '¿Qué tipo de carga aceptas?': 'cargo_type',
        ' ¿Estarías dispuesto a compartir información sobre tus rutas y disponibilidad de espacio para mejorar la eficiencia?': 'share_route_info',
        '¿Aceptarías un envío a cambio de un ingreso extra? ✔️💶': 'accept_for_extra_income',
        '💡¿Tienes alguna sugerencia o característica específica que te gustaría que NEAR incluyera?': 'driver_suggestions',
        '¿Utilizas servicios de paquetería habitualmente?': 'uses_delivery_services',
        '¿Con que frecuencia aproximadamente envías paquetes al mes? ⌛ ': 'package_frequency',
        '¿Cambiarías el método de envió por uno más económico y sostenible?': 'use_service',
        '¿Prefieres la recogida a domicilio, puntos de entrega locales, o ambas opciones? ': 'delivery_preference',
        '¿Qué tan dispuesto estarías a probar un nuevo servicio de envío como NEAR?': 'willingness_level',
        '💡¿Tienes alguna sugerencia o característica específica que te gustaría que NEAR incluyera?.1': 'comments'
    }
    
    # Rename columns that exist in the dataframe
    existing_columns = [col for col in column_map.keys() if col in df.columns]
    df = df.rename(columns={col: column_map[col] for col in existing_columns})
    
    # Clean and convert data types
    # Convert 'is_driver' to boolean
    if 'is_driver' in df.columns:
        df['is_driver'] = df['is_driver'].apply(lambda x: True if str(x).lower().strip() in ['si', 'sí', 'yes', 'true'] else False)
    
    # Convert age to numeric, handling non-numeric values
    if 'age' in df.columns:
        df['age'] = pd.to_numeric(df['age'], errors='coerce')
    
    # Convert timestamp to datetime if it exists
    if 'timestamp' in df.columns:
        df['timestamp'] = pd.to_datetime(df['timestamp'], errors='coerce')
    
    # Debug information
    st.sidebar.write(f"Loaded {len(df)} records from CSV")
    
    return df

def get_driver_data(df):
    """
    Extract and return only the driver-related data
    """
    if 'is_driver' not in df.columns:
        return pd.DataFrame()  # Return empty dataframe if no driver column
    
    driver_data = df[df['is_driver'] == True].copy()
    return driver_data

def get_customer_data(df):
    """
    Extract and return only the customer-related data
    """
    if 'is_driver' not in df.columns:
        return pd.DataFrame()  # Return empty dataframe if no driver column
    
    customer_data = df[df['is_driver'] == False].copy()
    return customer_data

def get_stats(df):
    """
    Calculate basic statistics from the dataframe
    """
    if df.empty:
        return {
            "total_responses": 0,
            "driver_count": 0,
            "customer_count": 0,
            "willing_drivers": 0,
            "willing_customers": 0
        }
    
    total_responses = len(df)
    driver_count = len(df[df['is_driver'] == True]) if 'is_driver' in df.columns else 0
    customer_count = len(df[df['is_driver'] == False]) if 'is_driver' in df.columns else 0
    
    willing_drivers = len(df[(df['is_driver'] == True) & 
                           (df['willing_to_deliver'] == 'Sí')]) if 'is_driver' in df.columns and 'willing_to_deliver' in df.columns else 0
                           
    willing_customers = len(df[(df['is_driver'] == False) & 
                             (df['willingness_level'] == 'Muy dispuesto')]) if 'is_driver' in df.columns and 'willingness_level' in df.columns else 0
    
    return {
        "total_responses": total_responses,
        "driver_count": driver_count,
        "customer_count": customer_count,
        "willing_drivers": willing_drivers,
        "willing_customers": willing_customers
    }
