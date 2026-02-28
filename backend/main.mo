import Map "mo:core/Map";
import List "mo:core/List";
import Principal "mo:core/Principal";

actor {
  type Surah = {
    number : Nat;
    nameArabic : Text;
    nameEnglish : Text;
    ayahCount : Nat;
    revelationType : Text;
  };

  type Ayah = {
    surahNumber : Nat;
    ayahNumber : Nat;
    uthmaniText : Text;
    urduTranslation : Text;
    englishTranslation : Text;
  };

  type JuzMapping = {
    juzNumber : Nat;
    startingSurah : Nat;
    startingAyah : Nat;
  };

  type Bookmark = {
    surahNumber : Nat;
    ayahNumber : Nat;
  };

  let surahsList = List.empty<Surah>();
  let ayahsList = List.empty<Ayah>();
  let juzList = List.empty<JuzMapping>();
  let bookmarks = Map.empty<Principal, Bookmark>();

  public shared ({ caller }) func addSurah(surah : Surah) : async () {
    surahsList.add(surah);
  };

  public shared ({ caller }) func addAyah(ayah : Ayah) : async () {
    ayahsList.add(ayah);
  };

  public shared ({ caller }) func addJuzMapping(juz : JuzMapping) : async () {
    juzList.add(juz);
  };

  public query ({ caller }) func getSurahs() : async [Surah] {
    surahsList.toArray();
  };

  public query ({ caller }) func getSurah(surahNumber : Nat) : async Surah {
    switch (surahsList.toArray().find(func(s) { s.number == surahNumber })) {
      case (null) { Runtime.trap("Surah not found") };
      case (?surah) { surah };
    };
  };

  public query ({ caller }) func getAyahs(surahNumber : Nat) : async [Ayah] {
    ayahsList.toArray().filter(func(a) { a.surahNumber == surahNumber });
  };

  public query ({ caller }) func getJuzIndex() : async [JuzMapping] {
    juzList.toArray();
  };

  public shared ({ caller }) func saveBookmark(surahNumber : Nat, ayahNumber : Nat) : async () {
    bookmarks.add(caller, { surahNumber; ayahNumber });
  };

  public query ({ caller }) func getBookmark() : async ?Bookmark {
    bookmarks.get(caller);
  };

  public shared ({ caller }) func resetData() : async () {
    surahsList.clear();
    ayahsList.clear();
    juzList.clear();
  };
};
