class ProviderSerializer < ApplicationSerializer
  def serializable_hash
    {
      id: resource.id,
      name: resource.name,
      email: resource.email,
      phone: resource.phone,
      rating: resource.rating,
      created_at: resource.created_at,
      updated_at: resource.updated_at,
      purchase_orders: options.fetch(:include_purchase_orders, true) ? serialize_purchase_orders : [],
      products: options.fetch(:include_products, true) ? serialize_products : []
    }
  end

  private

  def serialize_purchase_orders
    resource.purchase_orders.map do |purchase_order|
      PurchaseOrderSerializer.new(purchase_order, include_product: true, include_provider: false).serializable_hash
    end
  end

  def serialize_products
    resource.products.distinct.map do |product|
      ProductSerializer.new(product, include_purchase_orders: false, include_providers: false).serializable_hash
    end
  end
end
