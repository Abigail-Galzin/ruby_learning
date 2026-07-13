class AddStatusToProducts < ActiveRecord::Migration[8.1]
  def change
    add_column :products, :status, :string
    add_column :products, :reorder_level, :integer
  end
end
