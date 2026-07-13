class Api::V1::PurchaseOrdersController < ApplicationController
  before_action :set_options, :set_purchase_order, only: %i[ show update destroy]
  skip_before_action :verify_authenticity_token

  def new
    @purchase_order = PurchaseOrder.new # Inicializa el objeto vacío para el formulario
  end

  # GET /purchase_orders
  def index
    @purchase_orders = PurchaseOrder.includes(:product, :provider).all
    render json: @purchase_orders, status: :ok
  end

  # GET /purchase_orders/1
  def show
    render json: @purchase_order, status: :ok
  end

  # POST /purchase_orders
  def create
    @purchase_order = PurchaseOrder.new(purchase_order_params)

    if @purchase_order.save
      render json: @purchase_order, status: :created
    else
      render json: @purchase_order.errors, status: :unprocessable_content
    end
  end

  # PATCH/PUT /purchase_orders/1
  def update
    @purchase_order = PurchaseOrder.find(params[:id])

    if @purchase_order.update(purchase_order_params)
      render json: @purchase_order, status: :created
    else
      render :edit, status: :unprocessable_content
    end
  end

  # DELETE /purchase_orders/1
  def destroy
    @purchase_order.destroy!
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_options
      @products = Product.active
      @providers = Provider.all
    end

    def set_purchase_order
      @purchase_order = PurchaseOrder.find_by(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def purchase_order_params
      params.require(:purchase_order).permit(:product_id, :provider_id, :quantity, :unit_price, :delivery_date)
    end
end
