class ProductsController < ApplicationController
  before_action :set_product, only: %i[ show update destroy ]
  #rescue_from ActionController::ParameterMissing, with: :handle_parameter_missing

  #def handle_parameter_missing(exception)
   # render json: {
    #  status: 400,
     # error: "Bad Request",
      # Obtenemos el nombre del parámetro que faltó de forma limpia
      #errors: { exception.param => [" is missing or empty"] }
    #}, status: :bad_request
  #end

  # GET /products
  def index
    @products = Product.where()

    render json: @products.map(&:serialize_as_json)
  end

  # GET /products/1
  def show
    render json: @product
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
    if @product.update(product_params)
      render json: @product
    else
      render json: @product.errors, status: :unprocessable_content
    end
  end

  # DELETE /products/1
  def destroy
    @product.destroy!
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_product
      @product = Product.find(params.expect(:id))
    end

    # Only allow a list of trusted parameters through.
    def product_params
      params.expect(product: [ :name, :price, :hero_image, gallery_images: []])
    end
end
