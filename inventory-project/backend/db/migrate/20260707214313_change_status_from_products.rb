class ChangeStatusFromProducts < ActiveRecord::Migration[8.1]
  def change
    change_column :products, :status, 'integer USING CAST(status AS integer)', null: false, default: 0
  end
end
