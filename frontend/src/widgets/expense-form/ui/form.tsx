import {
  useWatch,
  type Control,
  type FieldErrors,
  type UseFormRegister,
} from "react-hook-form";

import {
  CalendarIcon,
  CreditCardIcon,
  DollarSignIcon,
  FileTextIcon,
  TagIcon,
  UserIcon,
} from "lucide-react";
import type { createExpenseFormData } from "../../../features/add-expense";
import { categories } from "../helper/catergory";

interface FormProps {
  register: UseFormRegister<createExpenseFormData>;
  errors: FieldErrors<createExpenseFormData>;
  control: Control<createExpenseFormData>;
}

export function Form({ register, errors, control }: FormProps) {
  const recipientType = useWatch({ name: "recipientType", control });

  return (
    <>
      <div className="space-y-6">
        {/* Description */}
        <div>
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-700"
          >
            Description
          </label>
          <div className="mt-1 relative rounded-md shadow-sm">
            <input
              type="text"
              id="description"
              {...register("description")}
              className={`block w-full pr-10 focus:outline-none sm:text-sm rounded-md ${
                errors.description
                  ? "border-red-300 text-red-900 placeholder-red-300 focus:ring-red-500 focus:border-red-500"
                  : "border-gray-300 focus:ring-blue-500 focus:border-blue-500"
              }`}
              placeholder="e.g., Salary payment - June 2023"
            />
            {errors.description && (
              <div className="mt-1 text-sm text-red-600">
                {errors.description.message}
              </div>
            )}
          </div>
        </div>
        {/* Amount and Category - Two columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Amount */}
          <div>
            <label
              htmlFor="amount"
              className="block text-sm font-medium text-gray-700"
            >
              Amount
            </label>
            <div className="mt-1 relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <DollarSignIcon
                  className="h-5 w-5 text-gray-400"
                  aria-hidden="true"
                />
              </div>
              <input
                type="number"
                id="amount"
                {...register("amount")}
                className={`block w-full pl-10 pr-12 focus:outline-none sm:text-sm rounded-md ${
                  errors.amount
                    ? "border-red-300 text-red-900 placeholder-red-300 focus:ring-red-500 focus:border-red-500"
                    : "border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                }`}
                placeholder="0.00"
                step="0.01"
                min="0"
              />
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                <span className="text-gray-500 sm:text-sm" id="price-currency">
                  USD
                </span>
              </div>
            </div>
            {errors.amount && (
              <div className="mt-1 text-sm text-red-600">
                {errors.amount.message}
              </div>
            )}
          </div>
          {/* Category */}
          <div>
            <label
              htmlFor="categoryId"
              className="block text-sm font-medium text-gray-700"
            >
              Category
            </label>
            <div className="mt-1 relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <TagIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
              </div>
              <select
                id="categoryId"
                {...register("category")}
                className={`block w-full pl-10 focus:outline-none sm:text-sm rounded-md ${
                  errors.category
                    ? "border-red-300 text-red-900 placeholder-red-300 focus:ring-red-500 focus:border-red-500"
                    : "border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                }`}
              >
                <option value="">Select Category</option>
                {categories.map((category, index) => (
                  <option key={index} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>
            {errors.category && (
              <div className="mt-1 text-sm text-red-600">
                {errors.category.message}
              </div>
            )}
          </div>
        </div>
        {/* Recipient Type */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Recipient Type
          </label>
          <div className="flex space-x-4">
            <div className="flex items-center">
              <input
                id="recipient-manager"
                {...register("recipientType")}
                type="radio"
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
              />
              <label
                htmlFor="recipient-manager"
                className="ml-2 block text-sm text-gray-700"
              >
                Manager/Staff
              </label>
            </div>
            <div className="flex items-center">
              <input
                id="recipient-external"
                type="radio"
                {...register("recipientType")}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
              />
              <label
                htmlFor="recipient-external"
                className="ml-2 block text-sm text-gray-700"
              >
                External Vendor
              </label>
            </div>
          </div>
        </div>
        {/* Recipient - conditional based on type */}
        {recipientType === "External Vendor" ? (
          <div>
            <label
              htmlFor="recipientManagerId"
              className="block text-sm font-medium text-gray-700"
            >
              Manager/Staff
            </label>
            <div className="mt-1 relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <UserIcon
                  className="h-5 w-5 text-gray-400"
                  aria-hidden="true"
                />
              </div>
              <select
                id="recipientManagerId"
                {...register("manager")}
                className={`block w-full pl-10 focus:outline-none sm:text-sm rounded-md ${
                  errors.manager
                    ? "border-red-300 text-red-900 placeholder-red-300 focus:ring-red-500 focus:border-red-500"
                    : "border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                }`}
              >
                <option value="">Select Manager</option>
                {managers.map((manager) => (
                  <option key={manager.id} value={manager.id}>
                    {manager.name}
                  </option>
                ))}
              </select>
            </div>
            {errors.manager && (
              <div className="mt-1 text-sm text-red-600">
                {errors.manager.message}
              </div>
            )}
          </div>
        ) : (
          <div>
            <label
              htmlFor="recipientExternalName"
              className="block text-sm font-medium text-gray-700"
            >
              Vendor/Recipient Name
            </label>
            <div className="mt-1 relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <UserIcon
                  className="h-5 w-5 text-gray-400"
                  aria-hidden="true"
                />
              </div>
              <input
                type="text"
                {...register("vendorName")}
                className={`block w-full pl-10 focus:outline-none sm:text-sm rounded-md ${
                  errors.vendorName
                    ? "border-red-300 text-red-900 placeholder-red-300 focus:ring-red-500 focus:border-red-500"
                    : "border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                }`}
                placeholder="e.g., Office Supplies Inc."
              />
            </div>
            {errors.vendorName && (
              <div className="mt-1 text-sm text-red-600">
                {errors.vendorName.message}
              </div>
            )}
          </div>
        )}
        {/* Date and Payment Method - Two columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Date */}
          <div>
            <label
              htmlFor="date"
              className="block text-sm font-medium text-gray-700"
            >
              Date
            </label>
            <div className="mt-1 relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <CalendarIcon
                  className="h-5 w-5 text-gray-400"
                  aria-hidden="true"
                />
              </div>
              <input
                type="date"
                id="date"
                {...register("date")}
                className={`block w-full pl-10 focus:outline-none sm:text-sm rounded-md ${
                  errors.date
                    ? "border-red-300 text-red-900 placeholder-red-300 focus:ring-red-500 focus:border-red-500"
                    : "border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                }`}
              />
            </div>
            {errors.date && (
              <div className="mt-1 text-sm text-red-600">
                {errors.date.message}
              </div>
            )}
          </div>
          {/* Payment Method */}
          <div>
            <label
              htmlFor="paymentMethod"
              className="block text-sm font-medium text-gray-700"
            >
              Payment Method
            </label>
            <div className="mt-1 relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <CreditCardIcon
                  className="h-5 w-5 text-gray-400"
                  aria-hidden="true"
                />
              </div>
              <select
                id="paymentMethod"
                {...register("paymentMethod")}
                className={`block w-full pl-10 focus:outline-none sm:text-sm rounded-md ${
                  errors.paymentMethod
                    ? "border-red-300 text-red-900 placeholder-red-300 focus:ring-red-500 focus:border-red-500"
                    : "border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                }`}
              >
                <option value="Bank Transfer">Bank Transfer</option>
                <option value="Credit Card">Credit Card</option>
                <option value="Cash">Cash</option>
                <option value="Check">Check</option>
                <option value="PayPal">PayPal</option>
                <option value="Other">Other</option>
              </select>
            </div>
            {errors.paymentMethod && (
              <div className="mt-1 text-sm text-red-600">
                {errors.paymentMethod.message}
              </div>
            )}
          </div>
        </div>
        {/* Notes */}
        <div>
          <label
            htmlFor="notes"
            className="block text-sm font-medium text-gray-700"
          >
            Notes (Optional)
          </label>
          <div className="mt-1 relative rounded-md shadow-sm">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FileTextIcon
                className="h-5 w-5 text-gray-400"
                aria-hidden="true"
              />
            </div>
            <textarea
              id="notes"
              {...register("notes")}
              rows={3}
              className="block w-full pl-10 focus:outline-none sm:text-sm rounded-md border-gray-300 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Additional notes about this expense..."
            />
          </div>
        </div>
      </div>
    </>
  );
}
