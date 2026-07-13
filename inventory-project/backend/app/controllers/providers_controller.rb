class ProvidersController < ApplicationController
  before_action :set_provider, only: %i[ show edit update destroy ]
  skip_before_action :verify_authenticity_token

  # GET /providers/new
  def new
    @provider = Provider.new
  end

  # GET /providers
  def index
    @providers = Provider.all
  end

  # GET /providers/1
  def show
  end

  # GET /providers/1/edit
  def edit
  end

  # POST /providers
  def create
    @provider = Provider.new(provider_params)

    if @provider.save
      redirect_to @provider, notice: "Provider successfully created."
    else
      render :new, status: :unprocessable_content
    end
  end

  # PATCH/PUT /providers/1
  def update
    if @provider.update(provider_params)
      redirect_to @provider, notice: "Provider successfully updated."
    else
      render :edit, status: :unprocessable_content
    end
  end

  # DELETE /providers/1
  def destroy
    @provider.destroy!
    redirect_to providers_url, notice: "Provider successfully deleted.", status: :see_other
  end

  private

  def set_provider
    @provider = Provider.find(params[:id])
  end

  def provider_params
    params.fetch(:provider, {}).permit(:name, :email, :phone, :address)
  end
end
