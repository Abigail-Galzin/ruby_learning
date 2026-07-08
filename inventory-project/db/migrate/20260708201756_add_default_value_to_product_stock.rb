class AddDefaultValueToProductStock < ActiveRecord::Migration[8.1]
  def change
    change_column_default :products, :stock, from: nil, to: 0
  end
end
