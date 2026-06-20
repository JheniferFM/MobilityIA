import pandas as pd
import os

path = r'C:\Users\jheni\Downloads\Nexus Mobility AI Project\Linhas_Onibus_DF_Completo.xlsx'
print('exists:', os.path.exists(path))

xls = pd.ExcelFile(path)
print('sheets:', xls.sheet_names)

for sheet in xls.sheet_names:
    df = pd.read_excel(path, sheet_name=sheet)
    print(f'\n=== SHEET: {sheet} ===')
    print('rows=', len(df))
    print('columns=', list(df.columns))
    print(df.head(10).to_string())
