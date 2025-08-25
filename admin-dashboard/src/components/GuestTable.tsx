// import React from 'react';
import { processRsvpData } from '../utils';

import { ColDef, ICellRendererParams } from 'ag-grid-community';
import { AgGridReact } from 'ag-grid-react';
import { LuCheck, LuBan } from 'react-icons/lu';


const DietPillRenderer = (props: any) => {
  const { data } = props;
  const pills: JSX.Element[] = [];
  const commonClasses = 'px-2 py-0.5 text-xs rounded-full'
  if (data?.vegetarian) {
    pills.push(
      <span
        key="vegetarian"
        className={`${commonClasses} bg-green-100 text-green-700 mr-1`}
      >
        Vegetarian
      </span>
    );
  }

  if (data?.vegan) {
    pills.push(
      <span
        key="vegan"
        className={`${commonClasses} bg-emerald-100 text-emerald-700"`}
      >
        Vegan
      </span>
    );
  }

  return <div className="flex items-center h-full">{pills}</div>;
};

const AttendanceRenderer = ({value, data}: ICellRendererParams) => {
  

  return (
    <div className="flex items-center justify-center h-full w-full">
      {(value === "attending" || data.primaryContactId!==undefined) && <LuCheck className="text-green-600 text-lg" />}
      {value === "not_attending" && <LuBan className="text-gray-400 text-lg" />}
    </div>
  );
};

export function GuestTable({ guests }: { guests: Array<any> }) {
  const colDefs: Array<ColDef> = [
    {
      field: 'status', width: 75, cellRenderer: AttendanceRenderer, filterParams: {
        values: ["Attending", "Not Attending"],

        valueFormatter: (params: any) => {
          if (params.value === "attending") return "Attending";
          if (params.value === "not_attending") return "Not Attending";
          return params.value;
        },
      }
    }, { field: 'firstName' },
    { field: 'lastName' },
    
    { field: 'diet', cellRenderer: DietPillRenderer },
    { field: 'requests' },
    { field: 'email' },
    { field: 'phone' },
    { field: 'pk' },
  ]

  return (
    <div style={{ height: 500 }}>
      <AgGridReact
        rowData={guests}
        // defaultColDef={{flex: 1}}
        columnDefs={colDefs}
        onFirstDataRendered={({ api }) => api.autoSizeAllColumns()}
      />
    </div>
  );
}
