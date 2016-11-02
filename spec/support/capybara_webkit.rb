# frozen_string_literal: true
# Capybara.javascript_driver = :webkit

# Capybara::Webkit.configure do |config|
#   config.block_unknown_urls
# end

require 'capybara/poltergeist'
Capybara.javascript_driver = :poltergeist
