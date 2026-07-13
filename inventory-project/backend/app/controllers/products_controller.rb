class ProductsController < ApplicationController
  before_action :set_product, only: %i[ show update destroy edit sell ]
  skip_before_action :verify_authenticity_token

  # GET /products/new
  def new
    @product = Product.new
  end

  # GET /products
  def index
    @products = Product.filtered(params)
  end

  # GET /products/1
  def show
  end

  # GET /products/1/edit
  def edit
  end

  # POST /products
  def create
    @product = Product.new(product_params)

    if @product.save
      redirect_to @product, notice: "Product successfully created (creado con éxito)."
    else
      render :new, status: :unprocessable_content
    end
  end

  # PATCH/PUT /products/1
  def update
    if @product.update(product_params)
      redirect_to @product, notice: "Product successfully updated (actualizado con éxito)."
    else
      render :edit, status: :unprocessable_content
    end
  end

  # DELETE /products/1
  def destroy
    @product.destroy!
    redirect_to products_url, notice: "Product successfully deleted (eliminado con éxito).", status: :see_other
  end

  # PATCH /products/1/sell
  def sell
    quantity = params[:quantity].to_i

    if quantity <= 0
      redirect_to @product, alert: "Quantity must be greater than 0 (mayor a cero)."
      return
    end

    if @product.sell_product(quantity)
      Rails.logger.info "Product ##{@product.id} (#{@product.name}) sold #{quantity} units. New stock: #{@product.stock}"
      redirect_to @product, notice: "#{quantity} product(s) sold."
    else
      redirect_to @product, alert: @product.errors.full_messages.to_sentence
    end
  end

  private

  def set_product
    @product = Product.find(params[:id])
  end

  def product_params
    params.expect(product: [ :name, :price, :stock, :category ])
  end
end
