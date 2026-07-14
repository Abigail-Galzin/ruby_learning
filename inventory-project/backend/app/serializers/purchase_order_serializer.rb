class PurchaseOrderSerializer < ApplicationSerializer
  def serializable_hash
    {
      id: resource.id,
      quantity: resource.quantity,
      unit_price: resource.unit_price,
      delivery_date: resource.delivery_date,
      created_at: resource.created_at,
      updated_at: resource.updated_at,
      product_id: resource.product_id,
      provider_id: resource.provider_id,
      product: serialize_product,
      provider: serialize_provider
    }
  end

  private

  def serialize_product
    return unless resource.product

    if options.fetch(:include_product, true)
      ProductSerializer.new(resource.product, include_purchase_orders: false, include_providers: false).serializable_hash
    else
      ProductSerializer.new(resource.product, include_purchase_orders: false, include_providers: false).serializable_hash
    end
  end

  def serialize_provider
    return unless resource.provider

    if options.fetch(:include_provider, true)
      ProviderSerializer.new(resource.provider, include_purchase_orders: false, include_products: false).serializable_hash
    else
      ProviderSerializer.new(resource.provider, include_purchase_orders: false, include_products: false).serializable_hash
    end
  end
end
