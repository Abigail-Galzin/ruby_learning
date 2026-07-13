class PurchaseOrdersController < ApplicationController
  before_action :set_options, only: %i[ new create edit update ]
  before_action :set_purchase_order, only: %i[ show edit update destroy ]
  before_action :authenticate_request!

  # GET /purchase_orders/new
  def new
    @purchase_order = PurchaseOrder.new
  end

  # GET /purchase_orders
  def index
    @purchase_orders = PurchaseOrder.includes(:product, :provider).all
  end

  # GET /purchase_orders/1
  def show
  end

  # GET /purchase_orders/1/edit
  def edit
  end

  # POST /purchase_orders
  def create
    @purchase_order = PurchaseOrder.new(purchase_order_params)

    if @purchase_order.save
      redirect_to @purchase_order, notice: "Purchase order successfully created."
    else
      render :new, status: :unprocessable_content
    end
  end

  # PATCH/PUT /purchase_orders/1
  def update
    if @purchase_order.update(purchase_order_params)
      redirect_to @purchase_order, notice: "Purchase order successfully updated."
    else
      render :edit, status: :unprocessable_content
    end
  end

  # DELETE /purchase_orders/1
  def destroy
    @purchase_order.destroy!
    redirect_to purchase_orders_url, notice: "Purchase order successfully deleted.", status: :see_other
  end

  private

  def set_options
    @products = Product.active
    @providers = Provider.all
  end

  def set_purchase_order
    @purchase_order = PurchaseOrder.find(params[:id])
  end

  def purchase_order_params
    params.require(:purchase_order).permit(:product_id, :provider_id, :quantity, :unit_price, :delivery_date)
  end
end
