'use client';

import { type ReactNode } from 'react';

type Column<T> = {
  key: string;
  label: string;
  render?: (row: T) => ReactNode;
};

type Props<T> = {
  columns: Column<T>[];
  rows: T[];
  onEdit?: (row: T) => void;
  onDelete?: (row: T) => void;
};

export default function AdminTable<T extends Record<string, unknown>>({
  columns,
  rows,
  onEdit,
  onDelete,
}: Props<T>) {
  return (
    <div className="overflow-x-auto rounded-xl border border-stone-700/50">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-stone-700/50 bg-herb-surface/80">
            {columns.map((col) => (
              <th key={col.key} className="px-4 py-3 text-left text-stone-400 font-medium">
                {col.label}
              </th>
            ))}
            {(onEdit || onDelete) && (
              <th className="px-4 py-3 text-right text-stone-400 font-medium">Aksi</th>
            )}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i} className="border-b border-stone-800/50 last:border-0">
              {columns.map((col) => (
                <td key={col.key} className="px-4 py-3 text-stone-300">
                  {col.render ? col.render(row) : String(row[col.key] ?? '')}
                </td>
              ))}
              {(onEdit || onDelete) && (
                <td className="px-4 py-3 text-right space-x-2">
                  {onEdit && (
                    <button
                      onClick={() => onEdit(row)}
                      className="text-herb-gold text-xs hover:underline"
                    >
                      Edit
                    </button>
                  )}
                  {onDelete && (
                    <button
                      onClick={() => onDelete(row)}
                      className="text-red-400 text-xs hover:underline"
                    >
                      Padam
                    </button>
                  )}
                </td>
              )}
            </tr>
          ))}
          {rows.length === 0 && (
            <tr>
              <td
                colSpan={columns.length + (onEdit || onDelete ? 1 : 0)}
                className="px-4 py-8 text-center text-stone-500"
              >
                Tiada data
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
