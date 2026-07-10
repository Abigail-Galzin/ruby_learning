class Api::V1::ProvidersController < ApplicationController
  before_action :set_provider, only: %i[ show update destroy ]
  skip_before_action :verify_authenticity_token

  # GET /providers
  def index
    @providers = Provider.all

    render json: @providers
  end

  # GET /providers/1
  def show
    render json: @provider
  end

  # POST /providers
  def create
    @provider = Provider.new(provider_params)

    if @provider.save
      render json: @provider, status: :created, location: @provider
    else
      render json: @provider.errors, status: :unprocessable_content
    end
  end

  # PATCH/PUT /providers/1
  def update
    if @provider.update(provider_params)
      render json: @provider
    else
      render json: @provider.errors, status: :unprocessable_content
    end
  end

  # DELETE /providers/1
  def destroy
    @provider.destroy!
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_provider
      @provider = Provider.find(params.expect(:id))
    end

    # Only allow a list of trusted parameters through.
    def provider_params
      params.fetch(:provider, {})
    end
end
