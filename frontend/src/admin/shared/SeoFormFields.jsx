import React from "react";

/**
 * Optional SEO fields for admin create/update forms.
 * @param {{ values: { seoTitle?: string, seoDescription?: string, seoKeywords?: string }, onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void, className?: string }} props
 */
export function SeoFormFields({ values, onChange, className = "" }) {
  return (
    <fieldset
      className={`border border-gray-200 rounded-lg p-4 mt-4 space-y-3 bg-gray-50 ${className}`}
    >
      <legend className="text-sm font-semibold text-gray-800 px-1">
        SEO (optional)
      </legend>
      <p className="text-xs text-gray-500 -mt-1 mb-2">
        Custom title, description, and keywords for search engines. Leave blank
        to use defaults from the main content.
      </p>
      <div>
        <label className="block text-xs font-medium text-gray-700">SEO title</label>
        <input
          type="text"
          name="seoTitle"
          value={values.seoTitle ?? ""}
          onChange={onChange}
          className="mt-1 w-full border border-gray-300 rounded px-2 py-1.5 text-sm"
          placeholder="Page or item title for Google"
        />
      </div>
      <div>
        <label className="block text-xs font-medium text-gray-700">
          SEO description
        </label>
        <textarea
          name="seoDescription"
          value={values.seoDescription ?? ""}
          onChange={onChange}
          rows={2}
          className="mt-1 w-full border border-gray-300 rounded px-2 py-1.5 text-sm"
          placeholder="~150–160 characters recommended"
        />
      </div>
      <div>
        <label className="block text-xs font-medium text-gray-700">
          SEO keywords
        </label>
        <input
          type="text"
          name="seoKeywords"
          value={values.seoKeywords ?? ""}
          onChange={onChange}
          className="mt-1 w-full border border-gray-300 rounded px-2 py-1.5 text-sm"
          placeholder="keyword one, keyword two"
        />
      </div>
    </fieldset>
  );
}
