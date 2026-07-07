class DeleteDefaultInPriceProduct < ActiveRecord::Migration[8.1]
  def change
    change_column_default :products, :price, from: "0.00", to: nil
  end
end
