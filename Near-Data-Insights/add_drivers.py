import pandas as pd
import numpy as np
from datetime import datetime, timedelta
import random
from sqlalchemy import create_engine, text
import os
from database import SurveyResponse, Session, Base, engine

# Initialize the database
Base.metadata.create_all(engine)

# Define the driver data to add
drivers_to_add = []

# Generate random dates over the past year
current_date = datetime.now()
start_date = current_date - timedelta(days=365)

# Spanish names for realism
spanish_names = [
    "García", "Rodríguez", "González", "Fernández", "López", 
    "Martínez", "Sánchez", "Pérez", "Gómez", "Martín",
    "Jiménez", "Ruiz", "Hernández", "Díaz", "Moreno",
    "Muñoz", "Álvarez", "Romero", "Alonso", "Gutiérrez",
    "Navarro", "Torres", "Domínguez", "Ramos", "Gil"
]

# Vehicle types
vehicle_types = ["Furgón pequeño", "Furgón grande", "Camión rígido", "Camión articulado"]
vehicle_weights = [0.3, 0.3, 0.25, 0.15]  # Probability weights

# Cargo types
cargo_types = ["General (cajas, palets)", "Paquetería", "Mercancía especial", "Cualquier tipo"]
cargo_weights = [0.4, 0.3, 0.1, 0.2]  # Probability weights

# Empty trip frequencies
frequency_options = ["1-3", "3-5", "5-7", "7-10"]
frequency_weights = [0.4, 0.35, 0.2, 0.05]  # Probability weights

# Generate 23 random driver records
for i in range(23):
    # Randomize creation date within the last year
    days_ago = random.randint(0, 364)
    timestamp = current_date - timedelta(days=days_ago)
    
    # Random age between 25 and 60
    age = random.randint(25, 60)
    
    # Gender (80% male, 20% female to reflect industry demographics)
    gender = "Hombre" if random.random() < 0.8 else "Mujer"
    
    # Employment type (60% autonomous, 40% salaried)
    employment_type = "Autonomo" if random.random() < 0.6 else "Asalariado"
    
    # Empty cargo (80% yes as specified)
    empty_cargo = "Sí" if random.random() < 0.8 else "No"
    
    # Willing to deliver (90% yes as specified)
    willing_to_deliver = "Sí" if random.random() < 0.9 else "Tal vez"
    
    # Random vehicle with weighted probabilities
    vehicle_type = random.choices(vehicle_types, weights=vehicle_weights, k=1)[0]
    
    # Random cargo type with weighted probabilities
    cargo_type = random.choices(cargo_types, weights=cargo_weights, k=1)[0]
    
    # Random frequency with weighted probabilities
    empty_trips_frequency = random.choices(frequency_options, weights=frequency_weights, k=1)[0]
    
    # Share route info (80% yes)
    share_route_info = "Sí" if random.random() < 0.8 else "No"
    
    # Accept for extra income (95% yes)
    accept_for_extra_income = "Si" if random.random() < 0.95 else "No"
    
    # Create driver object
    driver = {
        "timestamp": timestamp,
        "gender": gender,
        "age": age,
        "is_driver": True,
        "employment_type": employment_type,
        "empty_cargo": empty_cargo,
        "willing_to_deliver": willing_to_deliver,
        "empty_trips_frequency": empty_trips_frequency,
        "vehicle_type": vehicle_type,
        "cargo_type": cargo_type,
        "share_route_info": share_route_info,
        "accept_for_extra_income": accept_for_extra_income,
        "driver_suggestions": random.choice(["Buena aplicación", "Fácil de usar", "Que sea puntual", None] * 3)  # 75% chance of None
    }
    
    drivers_to_add.append(driver)

# Add the drivers to the database
with Session() as session:
    for driver_data in drivers_to_add:
        # Create a new SurveyResponse object
        new_driver = SurveyResponse(**driver_data)
        session.add(new_driver)
    
    session.commit()
    print(f"Successfully added {len(drivers_to_add)} new driver records to the database.")

# Also add them to the CSV file for backup
try:
    # Read existing CSV
    original_df = pd.read_csv("attached_assets/NearEncuesta.csv", delimiter=';', encoding='utf-8')
    
    # Convert our new records to a DataFrame
    new_drivers_df = pd.DataFrame(drivers_to_add)
    
    # Map our column names back to the CSV format
    column_map_reverse = {
        'timestamp': 'Marca temporal',
        'gender': 'Genero ',
        'age': '¿Qué edad tienes?',
        'is_driver': '¿Trabajas en la carretera? 🚚 ',
        'employment_type': '¿Eres autónomo o asalariado?',
        'empty_cargo': '¿Tienes momentos en los que la carga esta vacía?',
        'willing_to_deliver': '¿Estarías dispuesto a recoger un envío adicional si este se ajusta a tu ruta actual y está disponible inmediatamente? 📍',
        'empty_trips_frequency': '¿Con qué frecuencia tienes viajes de retorno vacíos a la semana? ⌛',
        'vehicle_type': '¿Qué tipo de vehículo usas?',
        'cargo_type': '¿Qué tipo de carga aceptas?',
        'share_route_info': ' ¿Estarías dispuesto a compartir información sobre tus rutas y disponibilidad de espacio para mejorar la eficiencia?',
        'accept_for_extra_income': '¿Aceptarías un envío a cambio de un ingreso extra? ✔️💶',
        'driver_suggestions': '💡¿Tienes alguna sugerencia o característica específica que te gustaría que NEAR incluyera?'
    }
    
    # Rename columns for CSV compatibility
    new_drivers_df = new_drivers_df.rename(columns={v: k for k, v in column_map_reverse.items() if v in new_drivers_df.columns})
    
    # Convert boolean is_driver to "Si"/"No"
    new_drivers_df['¿Trabajas en la carretera? 🚚 '] = "Si"
    
    # Format the timestamp column to match CSV format
    new_drivers_df['Marca temporal'] = new_drivers_df['Marca temporal'].dt.strftime('%m/%d/%Y %H:%M:%S')
    
    # Append to the original CSV
    combined_df = pd.concat([original_df, new_drivers_df], ignore_index=True)
    
    # Save the combined DataFrame back to CSV
    combined_df.to_csv("attached_assets/NearEncuesta_updated.csv", sep=';', encoding='utf-8', index=False)
    print("Successfully updated CSV file with new driver records.")
    
except Exception as e:
    print(f"Error updating CSV: {str(e)}")
    # Just focus on the database update if CSV update fails