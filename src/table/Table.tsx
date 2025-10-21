import React, { useMemo, useState } from "react";

/**
 * ReusableTable
 * Props:
 * - columns: Array of { key: string, header: string|node, sortable?: boolean, width?: string, render?: (item) => node }
 * - items: Array of objects
 * - rowKey: string (property name to use as key) or (item) => string
 * - className: extra classes for wrapper
 *
 * Example column: { key: 'name', header: 'Name', sortable: true, render: item => <b>{item.name}</b> }
 */

export default function Table({ columns = [], items = [], rowKey = "id", className = "" }:any) {
  const [sortKey, setSortKey] = useState(null);
  const [sortDir, setSortDir] = useState("asc"); // 'asc' | 'desc'

  const sortedItems = useMemo(() => {
    if (!sortKey) return items;
    const col = columns.find((c) => c.key === sortKey);
    const copy = [...items];
    copy.sort((a, b) => {
      const aVal = a[sortKey];
      const bVal = b[sortKey];

      // Basic value compare handling strings/numbers/dates
      if (aVal == null && bVal == null) return 0;
      if (aVal == null) return 1;
      if (bVal == null) return -1;

      // If column provides a custom accessor function (rare), use it
      const valA = typeof col?.accessor === "function" ? col.accessor(a) : aVal;
      const valB = typeof col?.accessor === "function" ? col.accessor(b) : bVal;

      // If both are numbers
      if (typeof valA === "number" && typeof valB === "number") {
        return sortDir === "asc" ? valA - valB : valB - valA;
      }

      // Try date
      const dateA = new Date(valA);
      const dateB = new Date(valB);
      if (!isNaN(dateA) && !isNaN(dateB)) {
        return sortDir === "asc" ? dateA - dateB : dateB - dateA;
      }

      // Fallback to string compare
      const sA = String(valA).toLowerCase();
      const sB = String(valB).toLowerCase();
      if (sA < sB) return sortDir === "asc" ? -1 : 1;
      if (sA > sB) return sortDir === "asc" ? 1 : -1;
      return 0;
    });
    return copy;
  }, [items, sortKey, sortDir, columns]);

  const handleSort = (col) => {
    if (!col.sortable) return;
    if (sortKey !== col.key) {
      setSortKey(col.key);
      setSortDir("asc");
      return;
    }
    setSortDir((d) => (d === "asc" ? "desc" : "asc"));
  };

  const getRowKey = (item, index) => {
    if (typeof rowKey === "function") return rowKey(item);
    return item[rowKey] ?? item.id ?? index;
  };

  return (
    <div className={"w-full overflow-x-auto " + className}>
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            {columns.map((col) => (
              <th
                key={col.key}
                scope="col"
                className={
                  "px-4 py-3 text-left text-xs font-medium uppercase tracking-wider select-none " +
                  (col.width ? ` ${col.width}` : "")
                }
                style={{ cursor: col.sortable ? "pointer" : "default" }}
                onClick={() => handleSort(col)}
              >
                <div className="flex items-center gap-2">
                  <span>{col.header}</span>
                  {col.sortable && (
                    <span className="text-gray-400 text-xs">
                      {sortKey === col.key ? (sortDir === "asc" ? "▲" : "▼") : "↕"}
                    </span>
                  )}
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {sortedItems.length === 0 ? (
            <tr>
              <td className="px-4 py-6 text-center text-sm text-gray-500" colSpan={columns.length}>
                No data
              </td>
            </tr>
          ) : (
            sortedItems.map((item, rowIndex) => (
              <tr key={getRowKey(item, rowIndex)} className="hover:bg-gray-50">
                {columns.map((col) => (
                  <td key={col.key} className="px-4 py-3 text-sm whitespace-normal align-top">
                    {typeof col.render === "function" ? col.render(item) : String(item[col.key] ?? "")}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

/*
Usage example (not exported):

const columns = [
  { key: 'name', header: 'Name', sortable: true },
  { key: 'email', header: 'Email' },
  { key: 'age', header: 'Age', sortable: true, width: 'w-24', render: item => item.age ?? '-' }
];

const items = [
  { id: 1, name: 'Alice', email: 'a@example.com', age: 28 },
  { id: 2, name: 'Bob', email: 'b@example.com', age: 35 }
];

<ReusableTable columns={columns} items={items} rowKey="id" />
*/
