class Api::V1::ProductsController < ApplicationController
  before_action :set_product, only: %i[ show update destroy sell ]
  skip_before_action :verify_authenticity_token

  def new
    @product = Product.new # Inicializa el objeto vacío para el formulario
  end

  # GET /products
  def index
    @products = Product.all

    render json: @products
  end

  # GET /products/1
  def show
    product = Product.find(params[:id])
    render json: product_json(product), status: :ok
  end

  # POST /products
  def create
    @product = Product.new(product_params)

    if @product.save
      render json: @product, status: :created, location: @product
    else
      render json: @product.errors, status: :unprocessable_content
    end
  end

  # PATCH/PUT /products/1
  def update
    @product = Product.find(params[:id])

    if @product.update(product_params)
      render json: @product, status: :ok
    else
      render json: @product.errors, status: :unprocessable_content
    end
  end

  # DELETE /products/1
  def destroy
    @product.destroy!
    #redirect_to products_url, notice: "Producto eliminado con éxito.", status: :see_other
  end

  def sell
    @product = Product.find(params[:id])
    quantity = params[:quantity].to_i

    if @product.sell_product(quantity)
      render json: @product, status: :ok, notice: "#{quantity} product(s) sold"
    else
      render json: @product.errors, status: :unprocessable_content
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_product
      @product = Product.find(params.expect(:id))
    rescue ActiveRecord::RecordNotFound
      render json: { error: "Producto no encontrado" }, status: :not_found
    end

    # Only allow a list of trusted parameters through.
    def product_params
      params.expect(product: [ :name, :price, :stock, :category ])
    end
end

