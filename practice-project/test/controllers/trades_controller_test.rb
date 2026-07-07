require "test_helper"

class TradesControllerTest < ActionDispatch::IntegrationTest
  setup do
    @trade = trades(:one)
  end

  test "should get index" do
    get trades_url, as: :json
    assert_response :success
  end

  test "should create trade" do
    assert_difference("Trade.count") do
      post trades_url, params: { trade: { name: @trade.name, price: @trade.price, timestamp: @trade.timestamp } }, as: :json
    end

    assert_response :created
  end

  test "should show trade" do
    get trade_url(@trade), as: :json
    assert_response :success
  end

  test "should update trade" do
    patch trade_url(@trade), params: { trade: { name: @trade.name, price: @trade.price, timestamp: @trade.timestamp } }, as: :json
    assert_response :success
  end

  test "should destroy trade" do
    assert_difference("Trade.count", -1) do
      delete trade_url(@trade), as: :json
    end

    assert_response :no_content
  end
end
