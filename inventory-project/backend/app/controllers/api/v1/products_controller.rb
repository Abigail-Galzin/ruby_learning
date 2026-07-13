class Api::V1::ProductsController < ApplicationController
  before_action :set_product, only: %i[ show update destroy sell ]
  skip_before_action :verify_authenticity_token

  # GET /api/v1/products
  def index
    @products = Product.all
    render json: @products, status: :ok
  end

  # GET /api/v1/products/1
  def show
    render json: @product, status: :ok
  end

  # POST /api/v1/products
  def create
    @product = Product.new(product_params)

    if @product.save
      render json: @product, status: :created, location: api_v1_product_url(@product)
    else
      render json: @product.errors, status: :unprocessable_content
    end
  end

  # PATCH/PUT /api/v1/products/1
  def update
    if @product.update(product_params)
      render json: @product, status: :ok
    else
      render json: @product.errors, status: :unprocessable_content
    end
  end

  # DELETE /api/v1/products/1
  def destroy
    @product.destroy!
    head :no_content
  end

  # PATCH /api/v1/products/1/sell
  def sell
    quantity = params[:quantity].to_i

    if quantity <= 0
      return render json: { errors: { quantity: ["must be greater than 0"] } },
        status: :unprocessable_content
    end

    if @product.sell_product(quantity)
      render json: { message: "#{quantity} product(s) sold", product: @product }, status: :ok
    else
      render json: @product.errors, status: :unprocessable_content
    end
  end

  private

  def set_product
    @product = Product.find(params[:id])
  rescue ActiveRecord::RecordNotFound
    render json: { error: "Product not found (no encontrado)" }, status: :not_found
  end

  def product_params
    params.expect(product: [ :name, :price, :stock, :category ])
  end
end
