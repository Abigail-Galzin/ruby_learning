class Api::V1::ProvidersController < ApplicationController
  before_action :set_provider, only: %i[ show update destroy ]
  skip_before_action :verify_authenticity_token

  # GET /api/v1/providers
  def index
    @providers = Provider.all
    render json: @providers, status: :ok
  end

  # GET /api/v1/providers/1
  def show
    render json: @provider, status: :ok
  end

  # POST /api/v1/providers
  def create
    @provider = Provider.new(provider_params)

    if @provider.save
      render json: @provider, status: :created, location: api_v1_provider_url(@provider)
    else
      render json: @provider.errors, status: :unprocessable_content
    end
  end

  # PATCH/PUT /api/v1/providers/1
  def update
    if @provider.update(provider_params)
      render json: @provider, status: :ok
    else
      render json: @provider.errors, status: :unprocessable_content
    end
  end

  # DELETE /api/v1/providers/1
  def destroy
    @provider.destroy!
    head :no_content
  end

  private

  def set_provider
    @provider = Provider.find(params[:id])
  rescue ActiveRecord::RecordNotFound
    render json: { error: "Provider not found" }, status: :not_found
  end

  def provider_params
    params.fetch(:provider, {}).permit(:name, :email, :phone, :address)
  end
end
