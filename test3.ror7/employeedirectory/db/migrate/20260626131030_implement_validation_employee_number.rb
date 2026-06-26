class ImplementValidationEmployeeNumber < ActiveRecord::Migration[8.1]
  def change
    change_column :employees, :employee_number, :string, null: false
    add_index :employees, :employee_number, unique: true
  end
end
