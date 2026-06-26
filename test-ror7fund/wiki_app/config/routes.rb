Rails.application.routes.draw do
  resources :wiki_posts do
    collection do 
      get 'example'
    end
  end 

  namespace :welcome do 
    get 'index'
    get 'about'
    get 'archive'
  end 
 
  get '/about', to: redirect('/welcome/about')
  root "welcome#index"
end