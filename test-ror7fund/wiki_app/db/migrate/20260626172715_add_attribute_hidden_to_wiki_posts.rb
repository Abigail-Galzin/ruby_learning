class AddAttributeHiddenToWikiPosts < ActiveRecord::Migration[8.1]
  def change
    add_column :wiki_posts, :hidden, :boolean
  end
end
