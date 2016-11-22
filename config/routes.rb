# frozen_string_literal: true
Rails.application.routes.draw do
  resources :passwords, controller: 'passwords', only: %i(create new)
  resource :session, controller: 'sessions', only: %i(create)

  resources :users, controller: 'users', only: %i(create) do
    resource :password,
      controller: 'passwords',
      only: %i(create edit update)
  end

  resources :invitations, only: %i(show) do
    member do
      post :accept
      post :decline
    end
  end

  resources :teams do
    resource :inbox, controller: 'inbox'
    resources :events do
      member do
        get ':date' => 'events#show'
      end
    end
    resources :people
    resources :stats
  end

  get '/login' => 'sessions#new', as: :sign_in
  delete '/logout' => 'sessions#destroy', as: :sign_out
  get '/register' => 'users#new', as: :sign_up

  constraints Clearance::Constraints::SignedIn.new do
    root to: 'teams#index', as: :signed_in_root
  end

  constraints Clearance::Constraints::SignedOut.new do
    root to: 'public#index'
  end
end
