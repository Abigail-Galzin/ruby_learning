class ProductSerializer < ApplicationSerializer
  def serializable_hash
    {
      id: resource.id,
      name: resource.name,
      price: resource.price,
      stock: resource.stock,
      category: resource.category,
      reorder_level: resource.reorder_level,
      status: resource.status,
      created_at: resource.created_at,
      updated_at: resource.updated_at,
      purchase_orders: options.fetch(:include_purchase_orders, true) ? serialize_purchase_orders : [],
      providers: options.fetch(:include_providers, true) ? serialize_providers : []
    }
  end

  private

  def serialize_purchase_orders
    resource.purchase_orders.map do |purchase_order|
      PurchaseOrderSerializer.new(purchase_order, include_product: false, include_provider: true).serializable_hash
    end
  end

  def serialize_providers
    resource.providers.distinct.map do |provider|
      ProviderSerializer.new(provider, include_purchase_orders: false, include_products: false).serializable_hash
    end
  end
end
