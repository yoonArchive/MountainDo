package com.hanssarang.backend.mountain.domain;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface MountainRepository extends JpaRepository<Mountain, Integer> {

    String FIND_MOUNTAINS = "select m.* " +
            "from mountain m ";
    String ADD_SEARCH_BY_KEYWORD = "where m.name like concat('%',:keyword,'%') ";
    String ADD_FILTER_BY_SI = "m.si like concat('%',:si,'%') ";
    String EXCEPT_ZERO_HEIGHT = "and m.height != 0 ";
    String ORDER_BY_COUNT_DESC = "order by v.count desc ";
    String LEFT_JOIN_WITH_HIKING =
            "left join (select count(h.trail_id) count, t.mountain_id " +
                    "   from hiking h " +
                    "   right join trail t " +
                    "   on t.trail_id = h.trail_id " +
                    "   group by t.mountain_id) v " +
                    "on m.mountain_id = v.mountain_id ";
    String INNER_JOIN_WITH_TRAIL =
            "inner join (select distinct t.mountain_id " +
                    "   from trail t " +
                    "   where t.name like concat('%',:keyword,'%') " +
                    "   and t.mountain_id is not null) v " +
                    "   on m.mountain_id = v.mountain_id ";
    String AND = "and ";
    String WHERE = "where ";

    @Query(value = FIND_MOUNTAINS +
            LEFT_JOIN_WITH_HIKING +
            ORDER_BY_COUNT_DESC +
            "limit :limit " +
            "offset :offset", nativeQuery = true)
    List<Mountain> findAllPopularity(int offset, int limit);

    @Query(value = FIND_MOUNTAINS +
            LEFT_JOIN_WITH_HIKING +
            "group by m.mountain_id " +
            "having sum(v.count) " +
            "limit 10", nativeQuery = true)
    List<Mountain> findIsHot();

    @Query(value = FIND_MOUNTAINS +
            ADD_SEARCH_BY_KEYWORD, nativeQuery = true)
    List<Mountain> findBySearchMountain(@Param("keyword") String keyword);

    @Query(value = FIND_MOUNTAINS +
            ADD_SEARCH_BY_KEYWORD +
            EXCEPT_ZERO_HEIGHT, nativeQuery = true)
    List<Mountain> findBySearchMountainExceptZeroHeight(@Param("keyword") String keyword);

    @Query(value = FIND_MOUNTAINS +
            ADD_SEARCH_BY_KEYWORD +
            AND +
            ADD_FILTER_BY_SI, nativeQuery = true)
    List<Mountain> findBySearchMountainAndFilterBySi(@Param("keyword") String keyword, @Param("si") String si);

    @Query(value = FIND_MOUNTAINS +
            ADD_SEARCH_BY_KEYWORD +
            AND +
            ADD_FILTER_BY_SI +
            EXCEPT_ZERO_HEIGHT, nativeQuery = true)
    List<Mountain> findBySearchMountainAndFilterBySiExceptZeroHeight(@Param("keyword") String keyword, @Param("si") String si);

    @Query(value = FIND_MOUNTAINS +
            LEFT_JOIN_WITH_HIKING +
            ADD_SEARCH_BY_KEYWORD +
            ORDER_BY_COUNT_DESC, nativeQuery = true)
    List<Mountain> findMountainsOrderByPopularityDesc(@Param("keyword") String keyword);

    @Query(value = FIND_MOUNTAINS +
            LEFT_JOIN_WITH_HIKING +
            ADD_SEARCH_BY_KEYWORD +
            AND +
            ADD_FILTER_BY_SI +
            ORDER_BY_COUNT_DESC, nativeQuery = true)
    List<Mountain> findFilteredMountainsOrderByPopularityDesc(@Param("keyword") String keyword, @Param("si") String si);

    @Query(value = FIND_MOUNTAINS +
            INNER_JOIN_WITH_TRAIL, nativeQuery = true)
    List<Mountain> findBySearchTrail(@Param("keyword") String keyword);

    @Query(value = FIND_MOUNTAINS +
            INNER_JOIN_WITH_TRAIL +
            WHERE +
            ADD_FILTER_BY_SI, nativeQuery = true)
    List<Mountain> findBySearchTrailAndFilterBySi(@Param("keyword") String keyword, @Param("si") String si);

    @Query(value = FIND_MOUNTAINS +
            INNER_JOIN_WITH_TRAIL +
            EXCEPT_ZERO_HEIGHT, nativeQuery = true)
    List<Mountain> findBySearchTrailExceptZeroHeight(@Param("keyword") String keyword);

    @Query(value = FIND_MOUNTAINS +
            INNER_JOIN_WITH_TRAIL +
            WHERE +
            ADD_FILTER_BY_SI +
            EXCEPT_ZERO_HEIGHT, nativeQuery = true)
    List<Mountain> findBySearchTrailAndFilterBySiExceptZeroHeight(String keyword, String si);

    @Query(value = "select m.* " +
            "from (select m2.* " +
            "      from mountain m2 " +
            "      inner join (select distinct t.mountain_id " +
            "                  from trail t " +
            "                  where t.name like concat('%', :keyword, '%') " +
            "                  and t.mountain_id is not null) v " +
            "      on m2.mountain_id = v.mountain_id) m " +
            "left join (select count(h.trail_id) count, t.mountain_id " +
            "          from hiking h " +
            "          right join trail t " +
            "          on t.trail_id = h.trail_id " +
            "          group by t.mountain_id) v " +
            "on m.mountain_id = v.mountain_id " +
            "order by v.count desc", nativeQuery = true)
    List<Mountain> findBySearchTrailOrderByPopularityDesc(String keyword);

    @Query(value = "select m.* " +
            "from (select m2.* " +
            "      from mountain m2 " +
            "      inner join (select distinct t.mountain_id " +
            "                  from trail t " +
            "                  where t.name like concat('%', :keyword, '%') " +
            "                  and t.mountain_id is not null) v " +
            "      on m2.mountain_id = v.mountain_id " +
            "      where m2.si like concat('%', :si, '%')) m " +
            "left join (select count(h.trail_id) count, t.mountain_id " +
            "          from hiking h " +
            "          right join trail t " +
            "          on t.trail_id = h.trail_id " +
            "          group by t.mountain_id) v " +
            "on m.mountain_id = v.mountain_id " +
            "order by v.count desc", nativeQuery = true)
    List<Mountain> findFilteredMountainsBySearchTrailOrderByPopularityDesc(String keyword, String si);
}
