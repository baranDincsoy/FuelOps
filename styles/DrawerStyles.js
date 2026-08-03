import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  // App header
  appHeader: {
    height: 56,
    backgroundColor: '#1a3a5c',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  menuButton: { paddingVertical: 6, paddingRight: 18, justifyContent: 'center' },
  hamburgerLine: {
    width: 22, height: 2.5, backgroundColor: '#fff',
    marginVertical: 2.5, borderRadius: 2,
  },
  appHeaderTitle: { color: '#fff', fontSize: 19, fontWeight: 'bold' },

  // Drawer overlay
  overlayContainer: { ...StyleSheet.absoluteFillObject, zIndex: 100 },
  backdrop: { ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(0,0,0,0.45)' },
  drawer: {
    position: 'absolute', top: 0, bottom: 0, left: 0,
    backgroundColor: '#fff',
    elevation: 16,
    shadowColor: '#000',
    shadowOffset: { width: 2, height: 0 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
  },

  // Drawer header
  header: { backgroundColor: '#1a3a5c', paddingTop: 48, paddingBottom: 24, paddingHorizontal: 20 },
  headerTitle: { color: '#fff', fontSize: 26, fontWeight: 'bold', letterSpacing: 1 },
  headerSubtitle: { color: '#a0c4e8', fontSize: 12, marginTop: 4 },

  // Menu
  menuList: { paddingTop: 12 },
  menuItem: {
    flexDirection: 'row', alignItems: 'center',
    paddingVertical: 14, paddingHorizontal: 20,
    marginHorizontal: 10, borderRadius: 8,
  },
  menuItemActive: { backgroundColor: '#e8f0fb' },
  menuIcon: { fontSize: 18, marginRight: 14 },
  menuLabel: { fontSize: 15, color: '#444', fontWeight: '500' },
  menuLabelActive: { color: '#1a3a5c', fontWeight: 'bold' },

  // Footer
  footer: {
    position: 'absolute', bottom: 28, left: 20, right: 20,
    paddingTop: 16, borderTopWidth: 1, borderTopColor: '#eee',
  },
  footerText: { fontSize: 11, color: '#aaa' },
  footerVersion: { fontSize: 11, color: '#ccc', marginTop: 2 },
});