import { useEffect, useState } from "react";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { DataTable } from "primereact/datatable";
import { MdBlock, MdModeEditOutline } from "react-icons/md";

interface IconButtonProps {
  icon: any;
  onClick: any;
  className: any;
  style: any;
  title: any;
}
const IconButton = ({
  icon,
  onClick,
  className,
  style,
  title,
}: IconButtonProps) => {
  return (
    <Button
      className={className}
      style={style}
      type="button"
      icon={icon}
      onClick={onClick}
      title={title}
    />
  );
};

interface DataTablePrimeProps {
  columns: any[];
  data: any[];
  onUpdate?: any;
  onDelete?: any;
  onEye?: any;
  onCodebar?: any;
  dataKey?: any;
  onEyeTooltip?: any;
  paginator?: any;
}

export const DataTablePrime = ({
  columns,
  data,
  onUpdate,
  onDelete,
  onEye,
  onCodebar,
  dataKey,
  onEyeTooltip = "Visualizar Archivo",
  paginator = true,
}: DataTablePrimeProps) => {
  const [dataTable, setDataTable] = useState(data);

  useEffect(() => {
    setDataTable(data);
  }, [data]);

  const buttonSuccess = (rowData: any) => (
    <div className="flex justify-center p-0 m-0">
      <IconButton
        className="p-button-info p-button-rounded"
        style={{ width: "30px", height: "30px", padding: "0", margin: "5px" }}
        icon={<MdModeEditOutline size={20} />}
        onClick={() => onUpdate(rowData)}
        title={"Editar"}
      />
    </div>
  );

  const buttonDecline = (rowData: any) => (
    <div className="flex justify-center p-0 m-0">
      <IconButton
        className="p-button-danger p-button-rounded"
        style={{ width: "30px", height: "30px", padding: "0", margin: "5px" }}
        icon={<MdBlock size={20} />}
        onClick={() => onDelete(rowData)}
        title={"Eliminar"}
      />
    </div>
  );

  const buttonEye = (rowData: any) => (
    <div className="flex justify-center p-0 m-0">
      <IconButton
        className="p-button-help p-button-rounded"
        style={{ width: "30px", height: "30px", padding: "0", margin: "5px" }}
        icon={"pi pi-eye"}
        onClick={() => onEye(rowData)}
        title={onEyeTooltip}
      />
    </div>
  );

  const buttonCodebar = (rowData: any) => (
    <div className="flex justify-center p-0 m-0">
      <IconButton
        className="p-button-help p-button-rounded"
        style={{ width: "30px", height: "30px", padding: "0", margin: "5px" }}
        icon={"pi pi-barcode"}
        onClick={() => onCodebar(rowData)}
        title={"Código de Barras"}
      />
    </div>
  );

  return (
    <>
      <DataTable
        value={dataTable}
        paginator={paginator}
        rows={10}
        dataKey={dataKey}
        size="small"
        // showGridlines
        emptyMessage="No se han encontrado resultados."
        className="text-xs dark:text-gray-200"
      >
        {columns &&
          columns.map((column, index) => (
            <Column
              key={`${column.campo}-${index}`}
              field={column.campo}
              body={column.body}
              header={column.nombre}
              className="text-sm font-semibold uppercase dark:text-gray-300"
              style={{ width: column.widthColumn || "auto" }}
            />
          ))}

        {onUpdate && (
          <Column
            className="w-10 m-0 p-0"
            headerStyle={{
              background: "#F9FAFB",
              color: "#374151",
            }}
            body={buttonSuccess}
          />
        )}

        {onEye && (
          <Column
            className="w-10 m-0 p-0"
            headerStyle={{
              background: "#F9FAFB",
              color: "#374151",
            }}
            body={buttonEye}
          />
        )}

        {onDelete && (
          <Column
            className="w-10 m-0 p-0"
            headerStyle={{
              background: "#F9FAFB",
              color: "#374151",
            }}
            body={buttonDecline}
          />
        )}

        {onCodebar && (
          <Column
            className="w-10 m-0 p-0"
            headerStyle={{
              background: "#F9FAFB",
              color: "#374151",
            }}
            body={buttonCodebar}
          />
        )}
      </DataTable>
    </>
  );
};