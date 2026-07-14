class Api::V1::PurchaseOrdersController < ApplicationController
  before_action :set_options, only: %i[ create update ]
  before_action :set_purchase_order, only: %i[ show update destroy ]
  skip_before_action :verify_authenticity_token

  # GET /api/v1/purchase_orders
  def index
    @purchase_orders = PurchaseOrder.includes(:product, :provider).all
    render json: @purchase_orders.map { |purchase_order| PurchaseOrderSerializer.new(purchase_order).serializable_hash }, status: :ok
  end

  # GET /api/v1/purchase_orders/1
  def show
    render json: PurchaseOrderSerializer.new(@purchase_order).serializable_hash, status: :ok
  end

  # POST /api/v1/purchase_orders
  def create
    @purchase_order = PurchaseOrder.new(purchase_order_params)

    if @purchase_order.save
      render json: PurchaseOrderSerializer.new(@purchase_order).serializable_hash, status: :created
    else
      render json: @purchase_order.errors, status: :unprocessable_content
    end
  end

  # PATCH/PUT /api/v1/purchase_orders/1
  def update
    if @purchase_order.update(purchase_order_params)
      render json: PurchaseOrderSerializer.new(@purchase_order).serializable_hash, status: :ok
    else
      render json: @purchase_order.errors, status: :unprocessable_content
    end
  end

  # DELETE /api/v1/purchase_orders/1
  def destroy
    @purchase_order.destroy!
    head :no_content
  end

  private

  def set_options
    @products = Product.active
    @providers = Provider.all
  end

  def set_purchase_order
    @purchase_order = PurchaseOrder.find(params[:id])
  rescue ActiveRecord::RecordNotFound
    render json: { error: "Purchase order not found" }, status: :not_found
  end

  def purchase_order_params
    params.require(:purchase_order).permit(:product_id, :provider_id, :quantity, :unit_price, :delivery_date)
  end
end
