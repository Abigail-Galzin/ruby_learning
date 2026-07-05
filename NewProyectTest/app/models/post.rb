class Post < ApplicationRecord

  def self.published
    where(status: 'publicado') # Busca en la base de datos [8, 9]
  end

  # Método de INSTANCIA: actúa sobre UN post específico
  def publish!
    self.status = 'publicado' # Usamos self. para llamar al método de escritura [10, 11]
    save                      # Persiste el cambio en la BD [12, 13]
  end
  def unpublish!
    self.status = 'no - publicado' # Usamos self. para llamar al método de escritura [10, 11]
    save                      # Persiste el cambio en la BD [12, 13]
  end
end