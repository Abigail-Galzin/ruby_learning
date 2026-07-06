ENV["RAILS_ENV"] ||= "test"
require_relative "../config/environment"
require "rails/test_help"

class ActiveSupport::TestCase
  # Ejecuta pruebas en paralelo según tus procesadores
  parallelize(workers: :number_of_processors)

  # Carga todos los fixtures en test/fixtures/*.yml
  fixtures :all

  # Agrega aquí métodos de ayuda personalizados para tus pruebas
end
