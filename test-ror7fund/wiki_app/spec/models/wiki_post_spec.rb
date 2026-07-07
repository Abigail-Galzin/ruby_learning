require 'rails_helper'

RSpec.describe WikiPost, type: :model do
  let!(:wiki_post1) {WikiPost.create!(title: 'Funny Frogs', description: 'Silly frogs from around the globe.',
  author: 'Billy Bindler')}
  it '#contributors' do
    contributors = ["Billy Bindler"]
    expect(WikiPost.contributors).to eq(contributors)
  end
end