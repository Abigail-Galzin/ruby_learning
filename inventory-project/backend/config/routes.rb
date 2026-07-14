Rails.application.routes.draw do
  resources :users
  resources :purchase_orders
  resources :providers
  resources :products do
    member do
      post :sell
    end
    collection do
      get :low_stock
    end
  end
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Reveal health status on /up that returns 200 if the app boots with no exceptions, otherwise 500.
  # Can be used by load balancers and uptime monitors to verify that the app is live.
  get "up" => "rails/health#show", as: :rails_health_check

  # Defines the root path route ("/")
  # root "posts#index"

  namespace :api, defaults: { format: :json } do
    namespace :v1 do
      resources :purchase_orders
      resources :products do
        collection do
          get :categories
        end
      end
      resources :providers
    end
  end
end
