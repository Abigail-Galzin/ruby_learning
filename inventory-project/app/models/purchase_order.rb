class PurchaseOrder < ApplicationRecord
  belongs_to :product
  belongs_to :provider

  validates :quantity, presence: true, numericality: { only_integer: true, greater_than: 0 }
  validates :unit_price, presence: true, numericality: { only_integer: true, greater_than: 0 }
  validate :valid_product
  validate :validate_category
  validate :validate_date

  def valid_product
    unless product.active?
      errors.add(:product, "Product Discontinued")
    end
  end

  def validate_category
    unless product.category == Product.premium_category && provider.rating < 4
      errors.add(:provider, "Not enough rating present in the provider")
    end
  end

  def validate_date
    currentDate = Date.current
    unless currentDate >= delivery_date.to_date
      errors.add(:purchase_order, "Invalid delivery date")
    end
  end
end
