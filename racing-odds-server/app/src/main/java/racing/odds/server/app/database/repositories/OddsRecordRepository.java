package racing.odds.server.app.database.repositories;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;

import racing.odds.server.app.database.models.OddsRecord;

public interface OddsRecordRepository extends MongoRepository<OddsRecord, String> {
  OddsRecord findOneById(String id);
  List<OddsRecord> findAll();
}