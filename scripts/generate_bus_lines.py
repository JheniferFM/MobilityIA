import json
import pathlib

import pandas as pd

ROOT = pathlib.Path(__file__).resolve().parents[1]
EXCEL_PATH = ROOT / "Linhas_Onibus_DF_Completo.xlsx"
OUTPUT_JSON = ROOT / "src" / "data" / "bus-lines.json"
OUTPUT_TS = ROOT / "src" / "data" / "busLines.ts"


def _normalize(value: object) -> str:
    if value is None or pd.isna(value):
        return ""
    return str(value).strip()


def _pick_column(columns: list[str], candidates: list[str]) -> str | None:
    normalized = {str(col).strip().lower(): str(col) for col in columns if str(col).strip()}
    for candidate in candidates:
        if candidate in normalized:
            return normalized[candidate]
    return None


def main() -> None:
    excel = pd.ExcelFile(EXCEL_PATH)
    records: list[dict[str, str]] = []
    seen: set[tuple[str, str]] = set()

    for sheet_name in excel.sheet_names:
        df = pd.read_excel(EXCEL_PATH, sheet_name=sheet_name)
        columns = [str(col) for col in df.columns]

        linha_col = _pick_column(
            columns,
            [
                "linha",
                "linha do ônibus",
                "linha onibus",
                "codigo",
                "codigo da linha",
                "numero da linha",
            ],
        )
        descricao_col = _pick_column(
            columns,
            [
                "descricao",
                "descrição",
                "descriçao",
                "rota",
                "trajeto",
                "nome",
                "nome da linha",
            ],
        )

        if not linha_col or not descricao_col:
            continue

        for _, row in df.iterrows():
            linha = _normalize(row.get(linha_col))
            descricao = _normalize(row.get(descricao_col))

            if not linha or not descricao:
                continue

            key = (linha, descricao)
            if key in seen:
                continue

            seen.add(key)
            records.append(
                {
                    "value": linha,
                    "line": f"Linha {linha}",
                    "label": descricao,
                }
            )

    if not records:
        raise RuntimeError(f"No bus line records were found in {EXCEL_PATH}")

    OUTPUT_JSON.parent.mkdir(parents=True, exist_ok=True)
    OUTPUT_JSON.write_text(
        json.dumps(records, ensure_ascii=False, indent=2) + "\n",
        encoding="utf-8",
    )
    OUTPUT_TS.write_text(
        "export const busLinesData = "
        + json.dumps(records, ensure_ascii=False, indent=2)
        + ";\n",
        encoding="utf-8",
    )

    print(f"Generated {len(records)} bus lines in {OUTPUT_JSON} and {OUTPUT_TS}")
    print("Sample:", records[:5])


if __name__ == "__main__":
    main()
