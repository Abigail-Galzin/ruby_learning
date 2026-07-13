class PurchaseOrder < ApplicationRecord
  belongs_to :product
  belongs_to :provider

  validates :quantity, presence: true, numericality: { only_integer: true, greater_than: 0 }
  validates :unit_price, presence: true, numericality: { greater_than: 0 }
  validate :valid_product
  validate :validate_category
  validate :validate_date
  after_save :add_stock_to_product

  def valid_product
    return unless product.present?

    unless product.active? || product.low_stock?
      errors.add(:product, "Product Discontinued")
    end
  end

  def validate_category
    return unless product.present? && provider.present?

    if product.category == Product.premium_category && provider.rating <= 4
      errors.add(:provider, "Not enough rating")
    end
  end

  def validate_date
    return unless delivery_date.present?

    currentDate = Date.current
    unless delivery_date.to_date >= currentDate
      errors.add(:purchase_order, "Invalid delivery date")
    end
  end

  def add_stock_to_product
    return unless product.active?

    product.update(stock: product.stock + quantity)
  end
end
