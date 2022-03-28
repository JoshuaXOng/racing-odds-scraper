package racing.odds.server.app.database.repositories;

import java.util.List;
import org.springframework.data.mongodb.repository.MongoRepository;
import racing.odds.server.app.database.models.Contestant;

public interface ContestantRepository extends MongoRepository<Contestant, String> {
  Contestant findOneById(String id);

  List<Contestant> findAll();
}
