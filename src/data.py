import pandas as pd

# Load data from Excel file
file_path = 'BigData_final.xlsx'
xls = pd.ExcelFile(file_path)

# List of years for which you have sheets
years = range(2012, 2022)

# Columns to keep
columns_to_keep = ['Continental Region', 'Country of Nationality', 'Arrivals (in numbers)', 'AIR']

# Initialize an empty DataFrame to store the merged data
merged_data = pd.DataFrame(columns=['Year'] + columns_to_keep)

# Loop through each year
for year in years:
    sheet_name = str(year)
    # Check if sheet exists for the current year
    if sheet_name in xls.sheet_names:
        # Read the sheet for the current year
        df = pd.read_excel(file_path, sheet_name=sheet_name)
        
        # Add a 'Year' column with the current year
        df['Year'] = year
        
        # Check if all columns to keep exist in the DataFrame
        missing_columns = set(columns_to_keep) - set(df.columns)
        if missing_columns:
            # Try matching columns with different cases
            mismatched_columns = []
            for column in missing_columns:
                matched = False
                for sheet_column in df.columns:
                    if sheet_column.lower() == column.lower():
                        mismatched_columns.append(sheet_column)
                        matched = True
                        break
                if not matched:
                    print(f"Warning: Column '{column}' not found in sheet '{sheet_name}'.")
            if mismatched_columns:
                print(f"Found matching columns: {mismatched_columns}.")
            else:
                print(f"Skipping sheet '{sheet_name}' due to missing columns: {missing_columns}.")
            continue
        
        # Convert 'Country of Nationality' column to string and remove leading/trailing whitespace
        if 'Country of Nationality' in df.columns:
            df['Country of Nationality'] = df['Country of Nationality'].astype(str).str.strip()
        
        # Keep only the columns you want
        df = df[columns_to_keep]
        
        # Append the data to the merged DataFrame
        merged_data = merged_data.append(df, ignore_index=True)

# Save the merged data to a new CSV file
merged_data.to_csv('merged_data.csv', index=False)

print("Merged data saved to 'merged_data.csv'")
