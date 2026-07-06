require "test_helper"
require "generators/base/base_generator"

class BaseGeneratorTest < Rails::Generators::TestCase
  tests BaseGenerator
  destination Rails.root.join("tmp/generators")
  setup :prepare_destination

  # test "generator runs without errors" do
  #   assert_nothing_raised do
  #     run_generator ["arguments"]
  #   end
  # end
end
