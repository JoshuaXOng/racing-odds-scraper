package racing.odds.server.app.database.repositories;

import java.util.List;
import org.springframework.data.mongodb.repository.MongoRepository;
import racing.odds.server.app.database.models.Venue;

public interface VenueRepository extends MongoRepository<Venue, String> {
  Venue findOneById(String id);

  List<Venue> findAll();
}
