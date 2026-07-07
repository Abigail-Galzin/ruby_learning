class ChangeColumnPriceToDecimalInTrades < ActiveRecord::Migration[8.1]
  def change
    change_column :trades, :price, :decimal, precision: 10, scale: 2
  end
end
