/*
 * @lc app=leetcode.cn id=1202 lang=cpp
 *
 * [1202] 交换字符串中的元素
 */

 // @lc code=start
class Djest{
  public:
  //parent是以index为值的一个向量数组？
  //rank是一个和parent长度相等为n，值为0的向量数组
    vector<int> parent;
    vector<int> rank;
    Djest(int n){
      for(int i=0;i<n;i++){
        parent.push_back(i);
        rank.push_back(0);
      }
    }

    int find(int x){
      if(parent[x]!=x){
        parent[x]=find(parent[x]);
      }
      return parent[x];
      //迭代函数，如果parent[x]和x相等的话，就返回parent【其实也是返回x
      //不相等的话，就继续寻找x的parent，直到x的parent是他自己
      //等于说是找一颗书的父节点
    }

    void merge(int x,int y){
      //找到两颗树的根节点
      int rx=find(x);
      int ry=find(y);
      if(rx!=ry){
        if(rank[rx]<rank[ry]){
          //c++的swap是直接封装好的嘛？
          swap(rx,ry);
        }
        //把y合并到了x上，下面那步的意思是矢+1
        parent[ry]=rx;
        if(rank[rx]== rank[ry]) rank[rx]+=1;
      }
    }
};
// class Solution {
//   public:
//     string smallestStringWithSwaps(string s, vector<vector<int>>& pairs) {
//       int n=s.size();
//       vector<char> rs(n);
//       Djset ds(n);
//       for(const auto& e:pairs){
//         ds.marge(e[0],e[1]);
//       }
      
//       unordered_map<int,vector<int>> um;
//       for(int i=0;i<n;i++){
//         um[ds.find(i)].push_back(i);
//       }

//       for(auto& [k,v]:um){
//         vector<int> c=v;
//         sort(v.begin(),v.end(),[&](auto a,auto b){
//           return s[a]<s[b];
//         });
//         for(int i=0;i<c.size();i++){
//           rs[c[i]]=s[v[i]];
//         }
//       }

//       s="";
//       for(const auto& e:rs) s+=e;
//       return s;
//     }
// };
// class Djset {
// public:
//     vector<int> parent;
//     vector<int> rank;
//     Djset(int n ) {
//         for (int i = 0; i < n; i++) {
//             parent.push_back(i);
//             rank.push_back(0);
//         }
//     }

//     int find(int x) {
//         if (parent[x] != x) {
//             parent[x] = find(parent[x]);
//         }
//         return parent[x];
//     }

//     void merge(int x, int y) {
//         int rx = find(x);
//         int ry = find(y);
//         if (rx != ry) {
//             if (rank[rx] < rank[ry]) {
//                 swap(rx, ry);
//             }
//             parent[ry] = rx;
//             if (rank[rx] == rank[ry]) rank[rx] += 1;
//         }
//     }
// };

class Solution {
public:
    string smallestStringWithSwaps(string s, vector<vector<int>>& pairs) {
        int n = s.size();
        vector<char> rs(n);
        Djest ds(n);
        for (const auto& e : pairs) ds.merge(e[0], e[1]);
        
        //  格式化并查集，即哪些下标可以交换
        unordered_map<int, vector<int> > um;
        for (int i = 0; i < n; i++) um[ds.find(i)].push_back(i);
        
        // 同一并查集按字典序排序
        for (auto& [k, v] : um) {
            vector<int> c = v;
            sort(v.begin(), v.end(), [&](auto a, auto b) {
                return s[a] < s[b];
            });
            for (int i = 0; i < c.size(); i++) rs[c[i]] = s[v[i]];
        }
        
        s = "";
        for (const auto& e : rs) s += e;
        return s;
    }
};

// @lc code=end

