class Api::UsersController < ApplicationController
  skip_before_action :verify_authenticity_token

  def index
    direction = params[:created_at] == 'desc' ? 'desc' : 'asc'

    users = User.order(created_at: direction)

    render json: users, status: :ok
  end

  def show
    user = User.find_by(id: params[:id])

    if user
      render json: user, status: :ok
    else
      render json: { error: "User not found" }, status: :not_found
    end
  end

  def create
    user = User.new(user_params)

    if user.save
      render json: user, status: :created
    else
      render json: { errors: user.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def update
    user = User.find_by(id: params[:id])

    if user
      if user.update(user_params)
        render json: user, status: :ok
      else
        render json: { errors: user.errors.full_messages }, status: :not_found
      end
    end
  end

  def destroy
    user = User.find_by(id: params[:id])

    if user
      user.destroy
      render json: { message: "User deleted" }, status: :ok
    else
      render json: { errors: user.errors.full_messages }, status: :not_found
    end
  end

  private

  def user_params
    params.permit(:username, :avatar)
  end

  def order_params
    params.permit(:created_at)
  end
end