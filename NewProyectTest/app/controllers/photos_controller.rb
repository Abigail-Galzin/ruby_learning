class PhotosController < ApplicationController
  before_action :set_photo, only: %i[ show edit update destroy ]
  skip_before_action :verify_authenticity_token

  # GET /photos or /photos.json
  def index
    @photos = Photo.all

    render json: @photos
  end

  # GET /photos/1 or /photos/1.json
  def show
  end

  # GET /photos/new
  def new
    @photo = Photo.new
  end

  # GET /photos/1/edit
  def edit
  end

  # POST /photos or /photos.json
  def create
    @photo = Photo.new(photo_params)

    if @photo.save
      render json: @photo.created_json, status: :created
    else
      render json: errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /photos/1 or /photos/1.json
  def update
    respond_to do |format|
      if @photo.update(photo_params)
        format.html { redirect_to @photo, notice: "Photo was successfully updated.", status: :see_other }
        format.json { render :show, status: :ok, location: @photo }
      else
        format.html { render :edit, status: :unprocessable_content }
        format.json { render json: @photo.errors, status: :unprocessable_content }
      end
    end
  end

  # DELETE /photos/1 or /photos/1.json
  def destroy
    @photo.destroy!

    respond_to do |format|
      format.html { redirect_to photos_path, notice: "Photo was successfully destroyed.", status: :see_other }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_photo
      @photo = Photo.find(params.expect(:id))
    end

    # Only allow a list of trusted parameters through.
    def photo_params
      params.require(:photo).permit(:caption, :image)
    end
end
