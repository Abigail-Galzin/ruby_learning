class TradesController < ApplicationController
  before_action :set_trade, only: %i[ show update destroy ]

  # GET /trades
  def index
    @trades = Trade.where(filter_params)

    render json: @trades
  end

  # GET /trades/1
  def show
    render json: @trade
  end

  # POST /trades
  def create
    @trade = Trade.new(trade_params)

    if @trade.save
      render json: @trade, status: :created, location: @trade
    else
      render json: @trade.errors, status: :unprocessable_content
    end
  end

  # PATCH/PUT /trades/1
  def update
    if @trade.update(trade_params)
      render json: @trade
    else
      render json: @trade.errors, status: :unprocessable_content
    end
  end

  # DELETE /trades/1
  def destroy
    render status: :method_not_allowed
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_trade
      @trade = Trade.find(params.expect(:id))
    end

    def trade_params
      permitted = params.expect(trade: [ :name, :price, :timestamp ])
      if permitted[:timestamp].present?
        permitted[:timestamp] = Time.at(permitted[:timestamp].to_i / 1000.0)
      end
      permitted
    end

    def filter_params
      params.permit(:name, :price)
    end
end
