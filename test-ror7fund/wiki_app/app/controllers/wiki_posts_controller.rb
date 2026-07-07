class WikiPostsController < ApplicationController
  include Factories
  before_action :set_wiki_post, only: %i[show edit update destroy]

  # GET /wiki_posts or /wiki_posts.json
  def index
    if params[:keyword].present?
      @wiki_posts = WikiPost.search(params[:keyword])
    else
      @wiki_posts = WikiPost.all
    end
  end

  # GET /wiki_posts/1 or /wiki_posts/1.json
  def show
    respond_to do |format|
      format.html do
        htmmlRender = RenderingStrategies::HtmlRendering.new
        render html: htmmlRender.render(@wiki_post).html_safe
      end
      format.text do
        text = RenderingStrategies::PlainTextRendering.new
        render html: text.render(@wiki_post)
      end
    end
  end

  def example; end

  # GET /wiki_posts/new
  def new
    @wiki_post = WikiPost.new
  end

  # GET /wiki_posts/1/edit
  def edit; end

  # POST /wiki_posts or /wiki_posts.json
  def create
    is_hidden = wiki_post_params[:hidden] == '1'

    @wiki_post = if is_hidden
      WikiPostFactory.create_hidden(wiki_post_params)
    else
      WikiPostFactory.create_visible(wiki_post_params)
    end

    respond_to do |format|
      if @wiki_post.save
        format.html { redirect_to wiki_post_url(@wiki_post), notice: 'Wiki post was successfully created.' }
        format.json { render :show, status: :created, location: @wiki_post }
      else
        format.html { render :new, status: :unprocessable_entity }
        format.json { render json: @wiki_post.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /wiki_posts/1 or /wiki_posts/1.json
  def update
    respond_to do |format|
      if @wiki_post.update(wiki_post_params)
        format.html { redirect_to wiki_post_url(@wiki_post), notice: 'Wiki post was successfully updated.' }
        format.json { render :show, status: :ok, location: @wiki_post }
      else
        format.html { render :edit, status: :unprocessable_entity }
        format.json { render json: @wiki_post.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /wiki_posts/1 or /wiki_posts/1.json
  def destroy
    @wiki_post.destroy

    respond_to do |format|
      format.html { redirect_to wiki_posts_url, notice: 'Wiki post was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private

  # Use callbacks to share common setup or constraints between actions.
  def set_wiki_post
    @wiki_post = WikiPost.find(params[:id])
  end

  # Only allow a list of trusted parameters through.
  def wiki_post_params
    params.fetch(:wiki_post, {}).permit(:title, :description, :author, :image, :hidden, :keyword)
  end
end
